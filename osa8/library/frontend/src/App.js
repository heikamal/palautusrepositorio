import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useQuery } from '@apollo/client'
import LoginForm from './components/LoginForm'
import { INIT_DATA } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [authors, setAuthors] = useState([])
  const [books, setBooks] = useState([])
  const [token, setToken] = useState(null)
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
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>

      <Authors show={page === 'authors'} authors={authors} updateAuthor={updateAuthor} token={token} />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} addBook={addBook} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
