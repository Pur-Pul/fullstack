import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		loginUser(state, action) {
			blogService.setToken(action.payload.token)
			console.log(action.payload)

			return action.payload
		},
		logoutUser(state, action) {
			blogService.setToken('')
			return null
		},
	},
})

export const { loginUser, logoutUser } = userSlice.actions

export const performLogin = (credentials) => {
	return async (dispatch) => {
		console.log(
			'logging in with',
			credentials.username,
			credentials.password
		)

		const response = await loginService.login(credentials)
		window.localStorage.setItem('loggedUser', JSON.stringify(response))
		dispatch(loginUser(response))
	}
}

export const performLogout = (blog) => {
	return async (dispatch) => {
		window.localStorage.removeItem('loggedUser')
		dispatch(logoutUser())
	}
}

export default userSlice.reducer
