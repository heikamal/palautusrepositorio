const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { GraphQLError } = require('graphql')

require('dotenv').config()
const jwt = require('jsonwebtoken')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    // palauta taulukoiden pituudet
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    // palauta kaikki kirjat
    
    allBooks:  async (root, args) => {

      const author = await Author.find({ name: args.author })

      const query = {}

      // jos kirjailija ollaan annettu
      if (author[0]){
        query.author = author[0].id
      }

      // jos genre ollaan annettu
      if (args.genre) {
        query.genres = args.genre
      }
      
      const books = await Book.find(query).populate('author')

      return books
    },
    //palauta kaikki kirjailijat
    allAuthors: async (root, args) => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  // kirjoitetaan funktio hakemaan jokaiselle kirjailijalle kaikki tämän kirjoittamat kirjat
  Author: {
    bookCount: async (root) => {
      // luo uusi taulukko suodattamalla kaikki 
      const authorBooks = await Book.collection.countDocuments({ author: root._id})
      return authorBooks
    } 
  },
  Mutation: {
    addBook: async (root, args, context) => {
      // lisää kirjautumisen tarve
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      // tee kirjasta oma olionsa
      // tee kirjailija, varmista onko jo olemassa ja kannassa
      let addAuthor = new Author({ name: args.author })
      const search = await Author.find({ name: addAuthor.name })
      if (search[0]){
        addAuthor = search[0]
      } else {
        try {
          await addAuthor.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name, 
              error
            }}) 
        }
      }
      
      const book = new Book({ title: args.title, 
        author: addAuthor, 
        published: args.published, 
        genres: args.genres })
      
      // lisää kirjailija kantaan kirjaan
      // lisää kirja kantaan
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Adding a new book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title, 
            error
          }}) 
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      // etsi kirjailija nimen perusteella
      const query = { name: args.name }
      const author = await Author.findOneAndUpdate(query, { born: args.setBornTo }, { returnDocument: 'after' })
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      console.log('user: ', user)

      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== "huehue" ) {
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

      return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser } 
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
