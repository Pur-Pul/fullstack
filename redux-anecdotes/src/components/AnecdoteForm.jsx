import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	const new_anecdote = (event) => {
		event.preventDefault()
		dispatch(createAnecdote(event.target.anecdote.value))
  	}
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={new_anecdote}>
				<div><input name='anecdote' /></div>
				<button>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm