import { useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { useField } from "../hooks"
import anecdoteContext from "../anecdote_context"

const CreateNew = (props) => {
    const [notification, setNotification] = useContext(anecdoteContext)
    const {reset : resetContent, ...content} = useField('text')
	const {reset : resetAuthor, ...author} = useField('text')
	const {reset : resetInfo, ...info} = useField('text')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        setNotification(`a new anecdote ${content.value} created!`)
        navigate('/')
    }

    const handleReset = (event) => {
        event.preventDefault()
        resetContent()
        resetAuthor()
        resetInfo()
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
                <button onClick={handleReset}>reset</button>
            </form>
        </div>
    )
}

export default CreateNew