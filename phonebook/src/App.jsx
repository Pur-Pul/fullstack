import { useEffect } from 'react'
import { useState } from 'react'
import personService from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === '') {
    return null
  } 

  return (
    <div className='message'>
      {message}
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

const Contacts = (props) => {
  return (
    <div>
      <h2>Numbers</h2>
      {props.persons.map(person => 
        <form key={person.id} onSubmit={() => {
          if (window.confirm(`Delete ${person.name}`)) {
            personService.deletePerson(person.id).then(response => {
              console.log(response)
            })
          }
        }}>
          <div>{person.name} {person.number} <button type="submit">delete</button></div>
        </form>
      )}
    </div>
  )
}

const App = () => {
  const [message, setMessage] = useState('')
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
    let name_exists = -1
    let number_exists = -1
    persons.forEach((element, index) => {
      if (element.name == newName) {
        name_exists = index
      }
    })
    persons.forEach((element, index) => {
      if (element.number == newNumber) {
        number_exists = index
      }
    })
    const new_person = {
      name: newName,
      number: newNumber
    }

    if (name_exists != -1 && number_exists == -1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(persons[name_exists].id, new_person).then(response => {
          const new_arr = persons.slice()
          new_arr.splice(name_exists, 1, response.data)
          setPersons(new_arr)
          setMessage(`Changed number for ${new_person.name}`)
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
      }
    } else if (number_exists != -1) {
      alert(`${newNumber} is already added to phonebook`)
    } else if (name_exists == -1 && number_exists == -1) {
      personService.create(new_person).then(response => {
        setPersons(persons.concat(response.data))
        setMessage(`Added ${new_person.name}`)
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  useEffect(() => {
    personService.getAll().then(response => {
      const data = response.data
      setPersons(data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter = {filter} handler = {handleFilterChange}/>
      <Add addName={addName} newName = {newName} newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} />
      <Contacts persons={personsToShow}/>
    </div>
  )
}

export default App