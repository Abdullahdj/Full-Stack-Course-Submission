import { useState, useEffect } from 'react'
import './App.css'
import personService from "./services/phonebook"


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


const PersonForm = ({ persons: persons, setPersons: setPersons }) => {
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
      })

    } else if (newPerson.name != "" && newPerson.number != "") {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace old number with new one?`)) {
        id = persons.filter((person) => newPerson.name === person.name)[0].id
        console.log(id)
        personService.updatePerson(id, newPerson).then(
          setPersons(persons.filter((person) => newPerson.name !== person.name).concat({...newPerson, id:id}))
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


const Persons = ({ persons: persons, filter: filter, setPersons: setPersons}) => {
  let peopleToShow = persons.filter((person) => person.name.toLowerCase().includes(filter))

  const deletePerson = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name} ?`)) {
      personService.deletePerson(person.id)
      setPersons(persons.filter((aPerson) => aPerson.id !== person.id))
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


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState("")

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

      <Filter filter={filter} setFilter={setFilter}/>

      <h3>Add a new</h3>

      <PersonForm persons={persons} setPersons={setPersons}/>

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} setPersons={setPersons}/>
    </div>
  )
}

export default App
