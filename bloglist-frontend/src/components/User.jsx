import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const User = () => {
	const id = useParams().id
	const user = useSelector((state) => state.users).find(
		(user) => user.id === id
	)
	if (!user) {
		return null
	}

	return (
		<div>
			<h1>{user.name}</h1>
			<h2>added blogs</h2>
			<ul>
				{user.blogs.map((blog) => {
					return <li key={blog.id}>{blog.title}</li>
				})}
			</ul>
		</div>
	)
}

export default User
