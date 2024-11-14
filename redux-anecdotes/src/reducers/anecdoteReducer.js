import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0
	}
}

const compareVotes = (a, b) => {
	return (a.votes > b.votes) ? -1 : ((b.votes > a.votes) ? 1 : 0)
}

const anecdoteSlice = createSlice({
    name: 'filter',
    initialState: [],
    reducers: {
		vote(state, action) {
			let index = state.findIndex(anecdote => anecdote.id === action.payload)
			let cloned_state = state.slice()
			cloned_state[index] = { ...state[index], votes: state[index].votes + 1 }
			cloned_state.sort(compareVotes)
			return cloned_state
		},
		appendAnecdote(state, action) {
			state.push(action.payload)
		},
		setAnecdotes(state, action) {
			return action.payload
		},
		updateAnecdote(state, action) {
			let index = state.findIndex(anecdote => anecdote.id === action.payload.id)
			state[index] = action.payload
		}
	}
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export const createAnecdote = content => {
	return async dispatch => {
		const new_anecdote = await anecdoteService.create(content)
		dispatch(appendAnecdote(new_anecdote))
	}
}

export const vote = id => {
	return async dispatch => {
		const updated_anecdote = await anecdoteService.vote(id)
		dispatch(updateAnecdote(updated_anecdote))
	}
}

export default anecdoteSlice.reducer