import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
	name: 'blog',
	initialState: [],
	reducers: {
		appendBlog(state, action) {
			state.push(action.payload)
		},
		setBlogs(state, action) {
			return action.payload
		},
	},
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
	return async (dispatch) => {
		let blogs = await blogService.getAll()
		blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
		dispatch(setBlogs(blogs))
	}
}

export const createBlog = (blog) => {
	return async (dispatch) => {
		const new_blog = await blogService.post(blog)
		console.log(new_blog)
		dispatch(appendBlog(new_blog))
	}
}

export default blogSlice.reducer
