import { useState } from "react"

const Blog = ({ blog, performLike, performRemove}) => {
	const [expand, setExpand] = useState(false)
	const loggedUserJSON = window.localStorage.getItem('loggedUser')
	let user;
	if (loggedUserJSON) {
		user = JSON.parse(loggedUserJSON)
	}
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const likeHandler = (event) => {
		event.preventDefault()
		performLike(blog.id)
	}

	const removeHandler = (event) => {
		event.preventDefault()
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			performRemove(blog.id)
		}
	}

	const hideWhenVisible = { display: expand ? 'none' : '' }
    const showWhenVisible = { display: expand ? '' : 'none' }
	const showIfCreator = {	display: (user.id == blog.creator.id) ? '' : 'none'}
	
	return (
		<div style={blogStyle}>
			<div style={hideWhenVisible}>
				{blog.title} {blog.author} <button onClick={() => setExpand(true)}>view</button>
			</div>
			<div style={showWhenVisible}>
				{blog.title} {blog.author} <button onClick={() => setExpand(false)}>hide</button><br/>
				<a href={blog.url}>{blog.url}</a><br/> 
				Likes: {blog.likes} <button onClick={likeHandler}>like</button><br/> 
				{blog.creator.name}<br/>
				<button style={showIfCreator} onClick={removeHandler}>remove</button>
			</div>
			
		</div>  
	)
}

export default Blog