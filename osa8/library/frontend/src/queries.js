import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    author {
      name
      born
      bookCount
    }
  }
`

export const INIT_DATA = gql`
  query ( $genre: String, $author: String ) {
    allAuthors {
    name
    born
    bookCount
  }
  allBooks (genre: $genre, author: $author){
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const CREATE_BOOK = gql`
  mutation Mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation Mutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ALL_BOOKS = gql`
  query ($genre: String, $author: String) {
    allBooks (genre: $genre, author: $author){
        title
        author {
          name
        }
        published
        genres
      }
  }
`

export const USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`