import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Notification = ({message}) => {
	if (message === null) {
	  	return null
	} 
  
	return (
	  	<div className={message.type}>
			{message.text}
	  	</div>
	)
}
  
const LoginForm = (props) => {
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

const BlogForm = (props) => {
	return (
		<div>
			<h1>create new</h1>
			<form onSubmit={props.blogHandler}>
				<div>
					title
						<input
						type="text"
						value={props.title}
						name="title"
						onChange={({ target }) => props.setTitle(target.value)}
					/>
				</div>
				<div>
					author
						<input
						type="text"
						value={props.author}
						name="author"
						onChange={({ target }) => props.setAuthor(target.value)}
					/>
				</div>
				<div>
					url
						<input
						type="text"
						value={props.url}
						name="url"
						onChange={({ target }) => props.setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
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

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const [message, setMessage] = useState(null)

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
			blogService.setToken(returned_user.token)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setMessage({text : exception.response.data.error, type : "error"})
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const logoutHandler = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedUser')
		setUser(null)
	}

	const blogHandler = async (event) => {
		event.preventDefault()
		try {
			const returned_blog = await blogService.post({
				title, author, url
			})
			const new_blogs = blogs.slice()
			new_blogs.push(returned_blog)
			setBlogs(new_blogs)
			setTitle('')
			setAuthor('')
			setUrl('')
			setMessage({text : `a new blog ${returned_blog.title} by ${returned_blog.author} added`, type : "message"})
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} catch (exception) {
			setMessage({text : exception.response.data.error, type : "error"})
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	return (
		<div>
			<Notification message={message} />
			{user === null ? <LoginForm loginHandler = {loginHandler} setUsername = {setUsername} setPassword = {setPassword}/> :
				<div>
					<p>{user.name} logged-in
					<button onClick={logoutHandler}>logout</button>
					</p>
					<Blogs blogs = {blogs}/>
					<BlogForm blogHandler = {blogHandler} setTitle = {setTitle} setAuthor = {setAuthor} setUrl= {setUrl} />
				</div>
			}
		</div>
	)
}

export default App