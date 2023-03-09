import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>{person.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  //lisää tapahtumankäsittelijä nimen lisäämiselle
  const addPerson = (event) => {
    // laita lisäämään nimi taulukkoon
    event.preventDefault()
    const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    console.log('button clicked', event.target)
  }

  // lisää tapahtumankäsittelijä syötekomponentin muutokselle
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/*tulosta henkilön tiedot*/}
      {persons.map(person =>
        <Person key={person.name} person={person} />)}
    </div>
  )

}

export default App
