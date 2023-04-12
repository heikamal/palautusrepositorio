const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

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
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allAuthors: [Author!]!
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
  }
`

const resolvers = {
  Query: {
    // palauta taulukoiden pituudet
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    // palauta kaikki kirjat
    
    allBooks:  async (root, args) => {
      // TODO: filters
      return Book.find({})
    },
    //palauta kaikki kirjailijat
    allAuthors: async (root, args) => {
      return Author.find({})
    },
  },
  /*// kirjoitetaan funktio hakemaan jokaiselle kirjailijalle kaikki tämän kirjoittamat kirjat
  Author: {
    bookCount: async (root) => {
      // TODO: make this work!
      // luo uusi taulukko suodattamalla kaikki 
      const authorBooks = books.filter(book => book.author === root.name)
      return authorBooks.length
    } 
  },*/
  Mutation: {
    addBook: (root, args) => {
      // tee kirjasta oma olionsa
      const book = new Book({ ...args })
      // tarkista onko kirjailija jo kannassa
        // tee kirjailijasta oma olionsa
        // lisää se kantaan
      
      // hae kirjailija kannasta ja lisää se kirjaan
      // lisää kirja kantaan
      return book.save()
    },
    editAuthor: (root, args) => {
      // etsi kirjailija nimen perusteella
      const updatedAuthor = { ...authors.find(author => author.name === args.name), born: args.setBornTo }
      // varmista että kirjailijalla on nimi => löytyy
      if (!updatedAuthor.name) {
        return null
      }
      // kopioi kirjailijoiden lista muokaten kirjailijan syntymävuotta
      authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
