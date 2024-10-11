const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('creator')
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
    let blog = new Blog(request.body)
    const creator = await User.findOne({})
    blog.creator = creator.id
    try {
        const saved_blog = await blog.save()
        creator.blogs = creator.blogs.concat(saved_blog._id)
        await creator.save()
        response.status(201).json(saved_blog)
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id
    try {
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const id = request.params.id
    const blog = request.body
    try {
        const result = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true, context: 'query' })
        response.status(201).json(result)
    } catch(exception) {
        next(exception)
    }
})
module.exports = blogsRouter