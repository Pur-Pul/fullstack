import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Contacts = ({persons}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

const Filter =(props) => {
  return (
    <form>
      <div>filter shown with: <input value={props.filter} onChange={props.handler}/></div>
    </form>
  )
}

const Add = (props) => {
  return(
    <div>
      <h2>add a new</h2>
      <form onSubmit={props.addName}>
        <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
        <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
  )
}

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const [filter, setFilter] = useState('')
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()
    let name_exists = false
    let number_exists = false
    persons.forEach((element) => name_exists = name_exists || element.name == newName)
    persons.forEach((element) => number_exists = number_exists || element.number == newNumber)
    if (name_exists) {
      alert(`${newName} is already added to phonebook`)
    } else if (number_exists) {
      alert(`${newNumber} is already added to phonebook`)
    } else {
      const new_person = { name: newName, number: newNumber}
      setPersons(persons.concat(new_person))
    }
    setNewName('')
    setNewNumber('')
  }
  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      const data = response.data
      setPersons(data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} handler = {handleFilterChange}/>
      <Add addName={addName} newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} />
      <Contacts persons={personsToShow}/>
    </div>
  )
}

export default App