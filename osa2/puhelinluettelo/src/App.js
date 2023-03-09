import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  // uusi numero
  const [newNumber, setNewNumber] = useState('')
  //filtteri
  const [filter, setFilter] = useState('')
  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

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

    setNewName('')
    setNewNumber('')
  }

  // tapahtumankäsittelijät syötekomponenttien muutoksille
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
      filter={filter}
      handleFilterChange={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm 
      addPerson={addPerson}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons peopleToShow={peopleToShow}/>
    </div>
  )

}

export default App
