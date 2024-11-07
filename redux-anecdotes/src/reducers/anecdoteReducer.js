import { createSlice } from '@reduxjs/toolkit'

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
		createAnecdote(state, action) {
			let new_state = [...state, action.payload]
			new_state.sort(compareVotes)
			return new_state
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer