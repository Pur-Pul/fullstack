const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('creator')
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id).populate('creator')
    response.json(blog)
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    try {
        const creator = request.user
        let blog = new Blog(request.body)
        
        
        blog.creator = creator.id
    
        let saved_blog = await blog.save()
        saved_blog = await saved_blog.populate('creator')

        creator.blogs = creator.blogs.concat(saved_blog._id)
        await creator.save()
        response.status(201).json(saved_blog)
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
    const id = request.params.id
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(id)
        
        if (blog.creator.toString() === user._id.toString()) {
            await Blog.findByIdAndDelete(id)
            response.status(204).end()
        } else {
            return response.status(403).json({ error: 'incorrect user' })
        }
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const id = request.params.id
    const blog = request.body
    try {
        const result = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true, context: 'query' }).populate('creator')
        response.status(201).json(result)
    } catch(exception) {
        next(exception)
    }
})
module.exports = blogsRouter