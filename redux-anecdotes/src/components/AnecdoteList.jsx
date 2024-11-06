import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationSet, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        console.log(state.filter);
        
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })

	const voteHandler = (event) => {
		event.preventDefault()
		const anecdote_id = event.target.getAttribute("anecdote_id")
		const anecdote_text = event.target.getAttribute("anecdote_text")
		dispatch(vote(anecdote_id))
		dispatch(notificationSet(`Voted for '${anecdote_text}'`))
		setTimeout(() => {
			dispatch(notificationRemove())
		}, 5000)
	}

    return (
        <div>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button anecdote_text = {anecdote.content} anecdote_id = {anecdote.id} onClick={voteHandler}>vote</button>
					</div>
				</div>
			)}
        </div>
    )
}

export default AnecdoteList