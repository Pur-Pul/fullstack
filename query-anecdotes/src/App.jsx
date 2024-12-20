import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET':
			return action.notification
		case 'RESET':
			return ''
		default:
			return state
	}
}

const App = () => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, '')
	const queryClient = useQueryClient()
	const newAnecdoteMutation = useMutation({ 
		mutationFn: createAnecdote,
		onSuccess: (data) => {
			notificationDispatch({ type:'SET', notification:`created anecdote ${data.content}` })
			setTimeout( () => { notificationDispatch({ type:'RESET' }) }, 5000)
			queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
		},
		onError: (error, variable, context) => {
			console.log(error);
			console.log(variable);
			console.log(context);
			
			
			
			notificationDispatch({ type:'SET', notification:error.response.data.error })
			setTimeout( () => { notificationDispatch({ type:'RESET' }) }, 5000)
		}
	})
	const updateAnecdoteMutation = useMutation({
		mutationFn: updateAnecdote,
		onSuccess: (data) => {
			notificationDispatch({ type:'SET', notification:`voted on anecdote ${data.content}` })
			setTimeout( () => { notificationDispatch({ type:'RESET' }) }, 5000)
		  	queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
		},
		onError: (data) => {
			notificationDispatch({ type:'SET', notification:`an error occured ${data}` })
			setTimeout( () => {
					notificationDispatch({ type:'RESET' })
				}, 5000
			)
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
		updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
		
	}

	return (
		<div>
		<h3>Anecdote app</h3>
		
		<Notification notification={notification}/>
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
