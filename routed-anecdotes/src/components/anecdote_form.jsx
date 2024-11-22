import { useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { useField } from "../hooks"
import anecdoteContext from "../anecdote_context"

const CreateNew = (props) => {
    const [notification, setNotification] = useContext(anecdoteContext)
    const content = useField('text')
	const author = useField('text')
	const info = useField('text')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            infor: info.value,
            votes: 0
        })
        setNotification(`a new anecdote ${content.value} created!`)
    }
  
    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                content:
                <input {...content} />
                <br/> 
                author:
                <input {...author} />
                <br/> 
                url for more info:
                <input {...info} />
                <br/> 
                <button>create</button>
            </form>
        </div>
    )
}

export default CreateNew