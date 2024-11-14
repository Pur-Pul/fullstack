import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationSet } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	const new_anecdote = async (event) => {
		event.preventDefault()
		const text = event.target.anecdote.value
		dispatch(createAnecdote(text))
		event.target.anecdote.value = ''
		dispatch(notificationSet(`Created anecdote: '${text}'`, 5))
		
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