import { useContext } from "react"
import { useNavigate } from 'react-router-dom'
import anecdoteContext from "../anecdote_context"

const CreateNew = (props) => {
    const [content, setContent, author, setAuthor, info, setInfo, notification, setNotification] = useContext(anecdoteContext)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content,
            author,
            info,
            votes: 0
        })
        setNotification(`a new anecdote ${content} created!`)
        setTimeout(() => {
            setNotification('')
        }, 5000)
        navigate('/')
    }
  
    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
            <div>
                content
                <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div>
                author
                <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div>
                url for more info
                <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
            </div>
            <button>create</button>
            </form>
        </div>
    )
}

export default CreateNew