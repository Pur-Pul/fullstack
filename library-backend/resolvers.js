const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const User = require('./models/user')
const Book = require('./models/book')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let books = Book.find({}).populate('author')
            if (args.author) {
                books = await Book.find({}).populate('author')
            }
            if (args.genre) {
                books = await Book.find({ genres: args.genre }).populate('author')
                
            }
            return books
        },
        allAuthors: async () => { return Author.find({}) },
        me: (root, args, context) => { return context.currentUser}
    },
    Author: {
        bookCount: async (root) => 0//books.filter((book) => book.author === root.name).length
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError('You are not logged in.', {
                extensions: { code: 'UNAUTHENTICATED' }
                })
            }
            let author = undefined
            if (args.author) {
                try {
                await Author.validate({ name: args.author })
                author = await Author.findOneAndUpdate(
                    { name: args.author },
                    {},
                    { upsert: true, new: true}
                )
                } catch (error) {
                throw new GraphQLError('Saving author failed', {
                    extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.author,
                    error
                    }
                })
                }
            }

            const book = new Book({ ...args, author: author })
            try {
                await book.save()
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.title,
                    error
                }
                })
            }
            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            return book
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError('You are not logged in.', {
                extensions: { code: 'UNAUTHENTICATED' }
                })
            }
            const author = await Author.findOneAndUpdate(
                { name: args.name },
                { $set: { ...args } },
                {new: true}
            )
            if (author) {
                await author.save()
            }
            return author
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
            return user.save()
            .catch(error => {
                throw new GraphQLError('Creating new user failed', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: [args.username, args.favoriteGenre],
                    error
                }
                })
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if ( !user || args.password !== 'secret' ) {
                throw new GraphQLError('wrong credentials', {
                extensions: {
                    code: 'BAD_USER_INPUT'
                }
                })        
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    },
    Subscription: {
        bookAdded: { subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED') }
    },
}

module.exports = resolvers