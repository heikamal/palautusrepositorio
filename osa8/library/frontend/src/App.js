import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'

// luodaan query kaikille kirjailijoille
const INIT_DATA = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
    allBooks {
      title
      author
      published
      genres
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [authors, setAuthors] = useState([])
  const [books, setBooks] = useState([])

  
  const result = useQuery(INIT_DATA)

  useEffect(() => {
    if (!result.loading){
      setAuthors(result.data.allAuthors)
      setBooks(result.data.allBooks)
    }
  }, [result])
 

  if (result.loading)  {
    return <div>loading...</div>
  }

  const addBook = (book) => {
    setBooks(books.concat(book))
    // jos kirjailija löytyy, kasvata kirjailijan kirjojen lukumäärää yhdellä
    // jos ei, lisää uusi kirjailija
    const names = authors.map(author => author.name)
    if (names.includes(book.author)){
      setAuthors(authors.map(author => author.name === book.author ? {...author, bookCount: author.bookCount + 1 } : author))
    } else {
      const newAuthor = { name: book.author, born: null, bookCount: 1}
      setAuthors(authors.concat(newAuthor))
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authors} />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} addBook={addBook} />
    </div>
  )
}

export default App
