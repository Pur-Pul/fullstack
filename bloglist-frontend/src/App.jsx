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

	const loginHandler = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)
		try {
			const returned_user = await loginService.login({
				username, password
			})
			setUser(returned_user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			console.log('wrong credentials');
		}
	}

	if (user === null) {
		return (
			<Login loginHandler = {loginHandler} setUsername = {setUsername} setPassword = {setPassword}/>
		)
	} else {
		return (
			<div>
				<h2>blogs</h2>
				<p>{user.name} logged in</p>
				<Blogs blogs = {blogs}/>
			</div>
		)
	}
}

export default App