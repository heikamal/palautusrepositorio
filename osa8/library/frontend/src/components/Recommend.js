import { ALL_BOOKS, USER } from '../queries'
import { useQuery, useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'

const Recommend = (props) => {
  const userQuery = useQuery(USER)
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])
  const [booksQuery] =
    useLazyQuery(ALL_BOOKS)
    
  useEffect(() => {
    if (!userQuery.loading) {
      console.log(userQuery.data)
      setGenre(userQuery.data.me.favoriteGenre)
    }
  }, [setGenre, userQuery])

  // kokonaan uusi kirjahaku hieman epäoptimi (ei esimerkiksi päivitä suosituksia oikein kirjaa lisätessä)
  // mutta tämä sentään näyttää suositukset jollakin tavalla
  const bookFetch = async () => {
    const response = await booksQuery({ variables: { genre: genre } })
    setBooks(response.data.allBooks)
  }

  useEffect(() => {
    if (genre) {
      bookFetch()
    }
  }, [genre, setBooks, booksQuery]) //eslint-disable-line

  if (userQuery.loading && booksQuery.loading) {
    return null
  }

  if (!props.show) {
    return null
  }
    

    return (
        <div>
        <h2>recommendations</h2>
        <table>
          <tbody>
            {books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    )
}

export default Recommend