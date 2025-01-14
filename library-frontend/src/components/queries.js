import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String, $published: Int, $genres: [String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
    }
    published
    genres
  }
}
`
export const ALL_BOOKS = gql`
query {
  allBooks {
    id
    title
    author {
      name
    }
    published
    genres
  }
}
`
export const BOOKS_BY_GENRE = gql`
query AllBooks($genre: String) {
  allBooks(genre: $genre) {
    id
    title
    author {
      name
    }
    published
    genres
  }
}
`
export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`
export const CURRENT_USER = gql`
query {
  me {
    username
    id
    favoriteGenre
  }
}
`
export const EDIT_BIRTH_YEAR = gql`
mutation editBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
}
`
export const LOGIN_USER = gql`
mutation Login($username: String!, $password: String!) {
  login(
    username: $username,
    password: $password
  ) {
    value
  }
}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      id
      author {
        name
      }
      published
      genres
    }
  }
`