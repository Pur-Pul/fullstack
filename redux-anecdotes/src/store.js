import anecdoteService from './services/anecdotes'
import anecdoteReducer, { appendAnecdote } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		filter: filterReducer,
		notification: notificationReducer
	}
})

anecdoteService.getAll().then(anecdotes => 
	anecdotes.forEach(anecdote => {
		store.dispatch(appendAnecdote(anecdote))
	})
)

export default store