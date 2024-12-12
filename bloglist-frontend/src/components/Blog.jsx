import { performRemove, performLike } from '../reducers/blogReducer'
import { notificationSet } from '../reducers/notificationReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Blog = () => {
	const blog = useSelector((state) => state.blogs).find(
		(blog) => blog.id === useParams().id
	)

	if (!blog) {
		return null
	}

	const dispatch = useDispatch()
	const loggedUserJSON = window.localStorage.getItem('loggedUser')
	let user
	if (loggedUserJSON) {
		user = JSON.parse(loggedUserJSON)
	}

	const likeHandler = (event) => {
		event.preventDefault()
		dispatch(performLike(blog.id))
			.then(() => {
				dispatch(
					notificationSet(
						{
							text: `Blog ${blog.title} liked.`,
							type: 'message',
						},
						5
					)
				)
			})
			.catch((exception) => {
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
			})
	}

	const removeHandler = (event) => {
		event.preventDefault()
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(performRemove(blog.id))
				.then(() => {
					dispatch(
						notificationSet(
							{
								text: `Blog ${blog.title} removed.`,
								type: 'message',
							},
							5
						)
					)
				})
				.catch((exception) => {
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
				})
		}
	}
	const showIfCreator = { display: user.id === blog.creator.id ? '' : 'none' }

	return (
		<div className="blog">
			<h2>{`${blog.title} by ${blog.author}`}</h2>
			<br />
			<a href={blog.url}>{blog.url}</a>
			<br />
			Likes: {blog.likes} <button onClick={likeHandler}>like</button>
			<br />
			{`Added by ${blog.creator.name}`}
			<br />
			<button style={showIfCreator} onClick={removeHandler}>
				remove
			</button>
		</div>
	)
}

export default Blog
