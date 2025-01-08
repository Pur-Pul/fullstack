import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { EDIT_BIRTH_YEAR } from './queries'

const BirthYearForm = ({ authors }) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [ editAuthor ] = useMutation(EDIT_BIRTH_YEAR)
    const submit = (e) => {
        e.preventDefault()
        let variables = { name, born }
        variables.born = (variables.born === "") ? undefined : Number(variables.born)
        
        console.log(variables)

        editAuthor({ variables })

        setName('')
        setBorn('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <select value={name} onChange={({ target }) => setName(target.value)}>
                        <option hidden='hidden' key = "">Select author</option>
                        {authors.map(author => <option key = {author.name}>{author.name}</option>)}
                    </select>
                    </div>
                    <div>
                    born
                    <input
                        type="number"
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default BirthYearForm