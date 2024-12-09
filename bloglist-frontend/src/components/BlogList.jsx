import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = (props) => {
	const blogs = useSelector((state) => {
		return state.blogs
	})

	return (
		<div className="blogs">
			<h1>blogs</h1>
			{blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					performLike={props.performLike}
					performRemove={props.performRemove}
				/>
			))}
		</div>
	)
}

export default BlogList
