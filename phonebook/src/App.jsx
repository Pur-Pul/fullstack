import { useState } from 'react'

const Contact = ({person}) => {
  return (<p>{person.name} {person.number}</p>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '111-1111111'}
  ]) 
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

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

  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Contact key={person.name} person={person}/>)}
    </div>
  )
}

export default App