import { useMutation } from "@apollo/client"
import { useState } from "react"
import { UPDATE_AUTHOR } from "../queries"



const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ updateAuthorBorn ] = useMutation(UPDATE_AUTHOR)
  if (!props.show) {
    return null
  }
  const authors = props.authors

  const updateHandler = async (event) => {
    event.preventDefault()

    const result =  await updateAuthorBorn({ variables: { name, setBornTo: parseInt(born) } })

    props.updateAuthor(result.data.editAuthor)

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token &&
      <div> 
      <h3>Set birthyear</h3>
      <form onSubmit={updateHandler}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)}
        </select><br/>
        born <input 
        type="number"
        value={born}
        onChange={({ target }) => setBorn(target.value)}
        /><br/>
        <button type='submit'>update author</button>
      </form>
      </div>}
    </div>
  )
}

export default Authors
