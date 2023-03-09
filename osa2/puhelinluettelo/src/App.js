import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244' }
  ]) 
  const [newName, setNewName] = useState('')
  // uusi numero
  const [newNumber, setNewNumber] = useState('')

  //lisää tapahtumankäsittelijä nimen lisäämiselle
  const addPerson = (event) => {
    event.preventDefault()

    if (newName === ''){
      alert(`name field empty`)
      return
    }
    if (newNumber === ''){
      alert(`number field empty`)
      return
    }

    // hae syöte taulukosta, jos ei löydy niin lisää annettu syöte
    if (persons.find(person => person.name === newName)) {
      console.log('uh-oh!')
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    // lisää nimi taulukkoon
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    console.log('lisätty!')

    setNewName('')
    setNewNumber('')
    console.log('button clicked', event.target)
  }

  // tapahtumankäsittelijät syötekomponenttien muutoksille
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
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
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {/*tulosta henkilön tiedot*/}
      {persons.map(person =>
        <Person key={person.name} person={person} />)}
    </div>
  )

}

export default App
