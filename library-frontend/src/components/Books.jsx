import { useQuery, useSubscription } from '@apollo/client'
import { BOOKS_BY_GENRE, BOOK_ADDED } from './queries'
import { useEffect, useState } from 'react'

const Books = () => {
  const [filter, setFilter] = useState('')
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])
  const result = useQuery(BOOKS_BY_GENRE, { variables: {genre: filter}, pollInterval: 2000 })
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    if (filter === '') {
      var temp = []
      books.forEach(book => temp = temp.concat(book.genres))
      setGenres([...new Set(temp)])
    }
  }, [books])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const book = data.data.bookAdded 
      //window.alert(`${book.title} by ${book.author.name} was added.`)
      setBooks(books.concat(book))
    }
  })

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author != null ? a.author.name : ""}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(genre => <button value={genre} key={genre} onClick={({ target }) => setFilter(target.value)}>{genre}</button>)}
      <button onClick={() => {setFilter('')}}>all genres</button>
    </div>
  )
}

export default Books
