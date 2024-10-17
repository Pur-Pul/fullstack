import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
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

const Blogs = (props) => {
	return (
		<div>
			{props.blogs.map(blog =>
				<Blog key={blog.id} blog={blog} performLike={props.performLike}/>
			)}
		</div>
	)
}

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
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

	const performLogin = async (credentials) => {
		console.log('logging in with', credentials.username, credentials.password)
		try {
			const response = await loginService.login(credentials)
			window.localStorage.setItem(
				'loggedUser', JSON.stringify(response)
			) 
			setUser(response)
			blogService.setToken(response.token)
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

	const createBlog = async (blogObject) => {
		try {
			const response = await blogService.post(blogObject)
			const new_blogs = blogs.slice()
			new_blogs.push(response)
			setBlogs(new_blogs)

			setMessage({text : `a new blog ${response.title} by ${response.author} added`, type : "message"})
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} catch (exception) {
			console.log(exception);
			
			setMessage({text : exception.response.data.error, type : "error"})
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const performLike = async (id) => {
		try {
			let blog = await blogService.get(id)
			const response = await blogService.update({likes : blog.likes + 1}, id)

			let new_blogs = blogs.slice()
			new_blogs[new_blogs.findIndex((blog) => blog.id === id)] = response
			setBlogs(new_blogs)
			setMessage({text : `Blog ${blog.title} liked.`, type : "message"})
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		} catch (exception) {
			console.log(exception);
			
			setMessage({text : exception.response.data.error, type : "error"})
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	return (
		<div>
			<Notification message={message} />
			{user === null ? <LoginForm performLogin={performLogin}/> :
				<div>
					<p>{user.name} logged-in
					<button onClick={logoutHandler}>logout</button>
					</p>
					<BlogForm createBlog = {createBlog}/>
					<Blogs blogs = {blogs} performLike = {performLike}/>
				</div>
			}
		</div>
	)
}

export default App