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
import User from './components/User'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useParams,
} from 'react-router-dom'

const App = () => {
	const user = useSelector((state) => {
		return state.login
	})
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [])

	const blogs = useSelector((state) => {
		return state.blogs
	})

	useEffect(() => {
		dispatch(initializeUsers())
	}, [blogs])

	const users = useSelector((state) => {
		return state.users
	})

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
		<Router>
			<Notification />
			{user === null ? (
				<LoginForm />
			) : (
				<div>
					<p>
						{user.name} logged-in
						<button onClick={logoutHandler}>logout</button>
					</p>
					<Routes>
						<Route
							path="/"
							element={
								<div>
									<BlogForm />
									<BlogList />
								</div>
							}
						/>
						<Route path="/users" element={<UserList />} />
						<Route
							path="/users/:id"
							element={<User users={users} />}
						/>
					</Routes>
				</div>
			)}
		</Router>
	)
}

export default App
