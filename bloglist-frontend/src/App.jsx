import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import { notificationSet } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import './index.css'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const blogFormRef = useRef()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const performLogin = async (credentials) => {
		console.log(
			'logging in with',
			credentials.username,
			credentials.password
		)
		try {
			const response = await loginService.login(credentials)
			window.localStorage.setItem('loggedUser', JSON.stringify(response))
			setUser(response)
			blogService.setToken(response.token)
		} catch (exception) {
			dispatch(
				notificationSet(
					{ text: exception.response.data.error, type: 'error' },
					5
				)
			)
		}
	}

	const logoutHandler = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedUser')
		setUser(null)
	}

	return (
		<div>
			<Notification />
			{user === null ? (
				<LoginForm performLogin={performLogin} />
			) : (
				<div>
					<p>
						{user.name} logged-in
						<button onClick={logoutHandler}>logout</button>
					</p>
					<BlogForm />
					<BlogList blogs={blogs} />
				</div>
			)}
		</div>
	)
}

export default App
