import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery } from '@apollo/client'
import LoginForm from './components/LoginForm'
import { INIT_DATA } from './queries'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [authors, setAuthors] = useState([])
  const [books, setBooks] = useState([])
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const client = useApolloClient()

  
  const result = useQuery(INIT_DATA)

  useEffect(() => {
    if ( result.data ){
      setAuthors(result.data.allAuthors)
      setBooks(result.data.allBooks)
    }
  }, [result.data]) // eslint-disable-line
 

  if (result.loading)  {
    return <div>loading...</div>
  }

  const addBook = (book) => {
    setBooks(books.concat(book))
    // jos kirjailija löytyy, kasvata kirjailijan kirjojen lukumäärää yhdellä
    // jos ei, lisää uusi kirjailija
    const names = authors.map(author => author.name)
    if (names.includes(book.author.name)){
      const oldAuthor = authors.find(author => author.name === book.author.name)
      const newAuthor = {...oldAuthor, bookCount: oldAuthor.bookCount + 1 }
      updateAuthor(newAuthor)
    } else {
      const newAuthor = { name: book.author.name, born: null, bookCount: 1}
      setAuthors(authors.concat(newAuthor))
    }
  }

  const updateAuthor = (newAuthor) => {
    setAuthors(authors.map(author => author.name === newAuthor.name ? newAuthor : author))
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  // lisätty kaikkien hakeminen aina uudestaan kun sivua päivitetään
  const changePage = (page) => {
    setPage(page)
    result.refetch({ author: null, genre: null })
  }

  return (
    <div>
      <div>
        <button onClick={() => changePage('authors')}>authors</button>
        <button onClick={() => changePage('books')}>books</button>
        {token && <button onClick={() => changePage('add')}>add book</button>}
        {token && <button onClick={() => changePage('recommend')}>recommend</button>}
        {!token && <button onClick={() => changePage('login')}>login</button>}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>

      <Authors show={page === 'authors'} authors={authors} updateAuthor={updateAuthor} token={token} />

      <Books show={page === 'books'} books={books} setBooks={setBooks} refetch={result.refetch} />

      <NewBook show={page === 'add'} addBook={addBook} />

      <Recommend show={page === 'recommend'} books={books} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} setUser={setUser} />
    </div>
  )
}

export default App
