import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote } from './requests'

const App = () => {
	const queryClient = useQueryClient()
	const newAnecdoteMutation = useMutation({ 
		mutationFn: createAnecdote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
		}
	})

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes
	})
	console.log(JSON.parse(JSON.stringify(result)))
	
	if ( result.isLoading ) {
		return <div>loading data...</div>
	} else if ( result.isError ) {
		return <div>anecdote service not available due to problems in the server</div>
	}
	
	const anecdotes = result.data

	const handleVote = (anecdote) => {
		console.log('vote')
	}

	return (
		<div>
		<h3>Anecdote app</h3>
		
		<Notification />
		<AnecdoteForm newAnecdoteMutation = {newAnecdoteMutation}/>
		
		{anecdotes.map(anecdote =>
			<div key={anecdote.id}>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => handleVote(anecdote)}>vote</button>
			</div>
			</div>
		)}
		</div>
	)
}

export default App
