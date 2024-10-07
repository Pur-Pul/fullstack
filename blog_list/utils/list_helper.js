const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    blogs.forEach((blog) => sum += blog.likes)
    return sum
}

const favoriteBlog = (blogs) => {
    let best = null
    blogs.forEach((blog) => {

        if (best == null || best.likes < blog.likes) {
            best = blog
        }
    })
    return best
}

const mostBlogs = (blogs) => {
    const authors = lodash.countBy(blogs, (blog)=>{
        return blog.author
    })
    console.log(authors);
    
    if (Object.keys(authors).length == 0) {
        return null
    }
    const most_author = Object.keys(authors).reduce((a, b) => authors[a] < authors[b] ? b : a);
    return {
        author : most_author,
        blogs : authors[most_author]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}