import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Login = (props) => {
	return (
		<div>
			<h1>log in to application</h1>
			<form onSubmit={props.loginHandler}>
				<div>
					username
						<input
						type="text"
						value={props.username}
						name="Username"
						onChange={({ target }) => props.setUsername(target.value)}
					/>
					</div>
					<div>
					password
						<input
						type="password"
						value={props.password}
						name="Password"
						onChange={({ target }) => props.setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

const Blogs = (props) => {
	return (
		<div>
			{props.blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	)
}

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)  
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
		  	const user = JSON.parse(loggedUserJSON)
		  	setUser(user)
		  	blogService.setToken(user.token)
		}
	  }, [])

	const loginHandler = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)
		try {
			const returned_user = await loginService.login({
				username, password
			})
			window.localStorage.setItem(
				'loggedUser', JSON.stringify(returned_user)
			) 
			setUser(returned_user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			console.log('wrong credentials');
		}
	}

	const logoutHandler = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedUser')
		setUser(null)
	}

	if (user === null) {
		return (
			<Login loginHandler = {loginHandler} setUsername = {setUsername} setPassword = {setPassword}/>
		)
	} else {
		return (
			<div>
				<h2>blogs</h2>
				<p>
					{user.name} logged in
					<button onClick={logoutHandler}>logout</button>
				</p>
				<Blogs blogs = {blogs}/>
			</div>
		)
	}
}

export default App