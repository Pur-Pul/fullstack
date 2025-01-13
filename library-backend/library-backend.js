const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const http = require('http')
const DataLoader = require('dataloader')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const Author = require('./models/author')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.set('strictQuery', false)
mongoose.set('debug', true);
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const start_server = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const wsServer = new WebSocketServer({ server: httpServer, path: '/', })
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)
  const bookLoader = new DataLoader(async (authorIds) => {
    //console.log(authorIds.length)
    const authorsWithBooks = await Author.aggregate([
      {
        $match: { _id: { $in: authorIds } }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: 'author',
          as: 'books'
        }
      },
      {
        $project: {
          name: 1,
          born: 1,
          books: 1
        }
      }
    ])
    //console.log(authorsWithBooks.length)
    return authorsWithBooks
  })

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        serverWillStart : async () => {
          return {
            drainServer: async () => { await serverCleanup.dispose() },
          };
        },
      }
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        let context = { loaders : { book: bookLoader } }
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          context.currentUser = await User.findById(decodedToken.id)
        }
        return context
      }
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server ready at http://localhost:${PORT}`)
  )
}

start_server()
