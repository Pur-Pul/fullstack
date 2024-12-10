import { useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import { loginUser, performLogout } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import './index.css'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from './reducers/userReducer'
import UserList from './components/UserList'

const App = () => {
	const user = useSelector((state) => {
		return state.login
	})
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(initializeUsers())
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(loginUser(user))
		}
	}, [])

	const logoutHandler = (event) => {
		event.preventDefault()
		dispatch(performLogout())
	}

	return (
		<div>
			<Notification />
			{user === null ? (
				<LoginForm />
			) : (
				<div>
					<p>
						{user.name} logged-in
						<button onClick={logoutHandler}>logout</button>
					</p>
					<BlogForm />
					<BlogList />
					<UserList />
				</div>
			)}
		</div>
	)
}

export default App
