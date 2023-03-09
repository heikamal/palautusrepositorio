import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

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
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input 
        value={filter}
        onChange={handleFilterChange}
        />
      </div>
      <h2>add a new</h2>
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
      {peopleToShow.map(person =>
        <Person key={person.name} person={person} />)}
    </div>
  )

}

export default App
