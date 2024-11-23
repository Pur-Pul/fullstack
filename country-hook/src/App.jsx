import React, { useState, useEffect } from 'react'
import { useCountry, useField } from './hooks'
import Country from './components/country'


const App = () => {
	const nameInput = useField('text')
	const [name, setName] = useState('')
	const country = useCountry(name)

	const fetch = (e) => {
		e.preventDefault()
		setName(nameInput.value)
	}

	return (
		<div>
		<form onSubmit={fetch}>
			<input {...nameInput} />
			<button>find</button>
		</form>

		<Country country={country} />
		</div>
  )
}

export default App