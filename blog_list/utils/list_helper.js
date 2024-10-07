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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}