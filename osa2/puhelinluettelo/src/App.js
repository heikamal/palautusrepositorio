import { useState, useEffect } from 'react'
import peopleService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  // uusi numero
  const [newNumber, setNewNumber] = useState('')
  //filtteri
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  // hae alkutila palvelimelta effect hookilla
  useEffect(() => {
    peopleService
      .getAll()
        .then(initialPeople => {
          setPersons(initialPeople)
        })
  }, [])

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
      // jos löytyy, muuta numero
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personA = persons.find(n => n.name === newName)
        const changedPerson = {...personA, number: newNumber}

        peopleService.updateNumber(personA.id, changedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personA.id ? person : returnedPerson))
          setNotificationMessage(
            `${newName} updated`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${newName} has already been removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setPersons(persons.filter(n => n.name !== newName))
      })
      }

      setNewName('')
      setNewNumber('')
      return
    }

    // lisää nimi taulukkoon
    const personObject = {
      name: newName,
      number: newNumber
    }

    peopleService
    .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))

        setNotificationMessage(
          `${newName} added`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)

        setNewName('')
        setNewNumber('')
    }).catch(error => {
      console.log(error.response.data)
      setErrorMessage(
        error.response.data.error
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
    
  }

  // tapahtumankäsittelijä poistopainikkeelle
  const deleteHandle = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      peopleService.delPerson(id)
      setPersons(persons.filter(n => n.id !== id))
    }

    setNotificationMessage(
      `${name} deleted`
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
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
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
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
      <Persons peopleToShow={peopleToShow} deleteHandle={deleteHandle} />
    </div>
  )

}

export default App
