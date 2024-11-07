import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationSet, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
	const dispatch = useDispatch()
	const new_anecdote = async (event) => {
		event.preventDefault()
		const text = event.target.anecdote.value
		dispatch(createAnecdote(text))
		event.target.anecdote.value = ''
		dispatch(notificationSet(`Created anecdote: '${text}'`))
		setTimeout(() => {
			dispatch(notificationRemove())
		}, 5000)
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