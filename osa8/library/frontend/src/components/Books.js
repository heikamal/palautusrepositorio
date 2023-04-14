
const Books = (props) => {

  const books = props.books
  const genres = []

  if (!props.show) {
    return null
  }

  books.forEach(book => {
    book.genres.forEach(genre => {
      if (!genres.includes(genre)){
        genres.push(genre)
      }
    })
  })

  const handleFilter = (filter) => {
    props.refetch({ genre: filter })
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(genre => <button key={genres.indexOf(genre)} onClick={() => {handleFilter(genre)}} >{genre}</button>)}
      <button onClick={() => {handleFilter(null)}}>all</button>
    </div>
  )
}

export default Books
