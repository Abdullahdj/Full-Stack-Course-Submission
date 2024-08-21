import { useState, useEffect } from 'react'
import './App.css'
import getPersons from "./services/phonebook"


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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()
    let newPerson = { name: newName , number: newNumber }
    if (newPerson.name != "" && newPerson.number != "" && !(persons.reduce((isInList, person) => 
      isInList || newPerson.name === person.name, false))) 
    {
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    } else if (newPerson.name != "" && newPerson.number != "") 
      {
      window.alert(`${newPerson.name} is already added to phonebook`)
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


const Persons = ({ persons: persons, filter: filter}) => {
  let peopleToShow = persons.filter((person) => person.name.toLowerCase().includes(filter))

  return (
    <>
      {peopleToShow.map((person) => <p key={person.id}>{person.name} {person.number}</p>)}
    </>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState("")

  useEffect(() => {
    getPersons().then((newPersons) => {
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
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App
