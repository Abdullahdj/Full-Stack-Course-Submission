import { useState, useEffect } from 'react'
import './App.css'
import personService from "./services/phonebook"
import "./index.css"


const Filter = ({filter: filter, setFilter: setFilter}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}


const PersonForm = ({ persons: persons, setPersons: setPersons, setNotificationMessage: setNotificationMessage , setIsErrorMessage: setIsErrorMessage}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()
    let id = Number(persons.reduce((maxID, person) => (maxID < person.id) ? person.id : maxID, 0)) + 1
    let newPerson = { name: newName.trim() , number: newNumber,  id: id.toString()}
    if (newPerson.name != "" && newPerson.number != "" && !(persons.reduce((isInList, person) => 
      isInList || newPerson.name === person.name, false))) 
    {
      personService.addPerson(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        setIsErrorMessage(false)
        setNotificationMessage(`Added ${newPerson.name}`)
        setTimeout(() => setNotificationMessage(""), 5000)
      })

    } else if (newPerson.name != "" && newPerson.number != "") {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace old number with new one?`)) {
        id = persons.filter((person) => newPerson.name === person.name)[0].id
        personService.updatePerson(id, newPerson).then( () => {
          setPersons(persons.filter((person) => newPerson.name !== person.name).concat({...newPerson, id:id}))
          setNewName("")
          setNewNumber("")
          setIsErrorMessage(false)
          setNotificationMessage(`Updated ${newPerson.name}`)
          setTimeout(() => setNotificationMessage(""), 5000)
        }
        )
      }
    } else 
    {
      window.alert("No name or no number provided")
    }
  } 

  return (
    <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}


const Persons = ({ persons: persons, filter: filter, setPersons: setPersons, setNotificationMessage: setNotificationMessage , setIsErrorMessage: setIsErrorMessage}) => {
  let peopleToShow = persons.filter((person) => person.name.toLowerCase().includes(filter))

  const deletePerson = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name} ?`)) {
      personService.deletePerson(person.id).then(() => {
        setPersons(persons.filter((aPerson) => aPerson.id !== person.id))
        setIsErrorMessage(false)
        setNotificationMessage(`Deleted ${person.name}`)
        setTimeout(() => setNotificationMessage(""), 5000)
      }).catch( () => {
        setPersons(persons.filter((aPerson) => aPerson.id !== person.id))
        setIsErrorMessage(true)
        setNotificationMessage(`Information of ${person.name} has already been removed from server`)
        setTimeout(() => setNotificationMessage(""), 5000)
      }
      )
    }
  }

  return (
    <>
      {peopleToShow.map((person) => { return ( 
          <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button> </p> 
      )
    })}
    </>
  )
}

const Notification = ({message: message, isError: isError}) => {
  if (message === "") {
    return null
  }

  let classname = "notification"
  if (isError) {
    classname = "error"
  }

  return (
    <div className={classname}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [isErrorMessage, setIsErrorMessage] = useState(false)

  useEffect(() => {
    personService
      .getPersons()
      .then((newPersons) => {
        setPersons(newPersons)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} isError={isErrorMessage}/>

      <Filter filter={filter} setFilter={setFilter}/>

      <h3>Add a new</h3>

      <PersonForm persons={persons} setPersons={setPersons} setNotificationMessage={setNotificationMessage} setIsErrorMessage={setIsErrorMessage}/>

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} setPersons={setPersons} setNotificationMessage={setNotificationMessage} setIsErrorMessage={setIsErrorMessage}/>
    </div>
  )
}

export default App
