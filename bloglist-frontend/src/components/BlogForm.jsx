import { useState } from "react"

const BlogForm = ({
    createBlog
}) => {
    const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
    const [formVisible, setFormVisible] = useState(false)

    const blogHandler = (event) => {
		event.preventDefault()
		createBlog({
            title,
            author,
            url
        })
        
        setTitle('')
        setAuthor('')
        setUrl('')
        setFormVisible(false)
	}

    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }

	return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => setFormVisible(true)}>new blog</button>
            </div>
            <div style={showWhenVisible}>
                <h1>create new</h1>
                <form onSubmit={blogHandler}>
                    <div>
                        title
                            <input
                            type="text"
                            value={title}
                            name="title"
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                    <div>
                        author
                            <input
                            type="text"
                            value={author}
                            name="author"
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
                        url
                            <input
                            type="text"
                            value={url}
                            name="url"
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </div>
                    <button type="submit">create</button>
                </form>
            </div>
        </div>
	)
}

export default BlogForm