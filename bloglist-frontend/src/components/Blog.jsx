import { useState } from 'react'
import PropTypes from 'prop-types'
import { performRemove, performLike } from '../reducers/blogReducer'
import { notificationSet } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
	const dispatch = useDispatch()
	const [expand, setExpand] = useState(false)
	const loggedUserJSON = window.localStorage.getItem('loggedUser')
	let user
	if (loggedUserJSON) {
		user = JSON.parse(loggedUserJSON)
	}
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const likeHandler = (event) => {
		event.preventDefault()
		try {
			dispatch(performLike(blog.id))
			dispatch(
				notificationSet(
					{
						text: `Blog ${blog.title} liked.`,
						type: 'message',
					},
					5
				)
			)
		} catch (exception) {
			console.log(exception)
			dispatch(
				notificationSet(
					{
						text: exception.response.data.error,
						type: 'error',
					},
					5
				)
			)
		}
	}

	const removeHandler = (event) => {
		event.preventDefault()
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			try {
				dispatch(performRemove(blog.id))
				dispatch(
					notificationSet(
						{
							text: `Blog ${blog.title} removed.`,
							type: 'message',
						},
						5
					)
				)
			} catch (exception) {
				console.log(exception)
				dispatch(
					notificationSet(
						{
							text: exception.response.data.error,
							type: 'error',
						},
						5
					)
				)
			}
		}
	}

	const hideWhenVisible = { display: expand ? 'none' : '' }
	const showWhenVisible = { display: expand ? '' : 'none' }
	const showIfCreator = { display: user.id === blog.creator.id ? '' : 'none' }

	return (
		<div className="blog" style={blogStyle}>
			<div style={hideWhenVisible} data-testid="collapsed">
				{blog.title} {blog.author}{' '}
				<button onClick={() => setExpand(true)}>view</button>
			</div>
			<div style={showWhenVisible} data-testid="expanded">
				{blog.title} {blog.author}{' '}
				<button onClick={() => setExpand(false)}>hide</button>
				<br />
				<a href={blog.url}>{blog.url}</a>
				<br />
				Likes: {blog.likes} <button onClick={likeHandler}>like</button>
				<br />
				{blog.creator.name}
				<br />
				<button style={showIfCreator} onClick={removeHandler}>
					remove
				</button>
			</div>
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
}

export default Blog
