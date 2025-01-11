import { gql, useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'
import { useState } from 'react'

const Books = () => {
  const result = useQuery(ALL_BOOKS, { pollInterval: 2000 })
  const [filter, setFilter] = useState('')
  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks
  let genres = []
  books.forEach(book => genres = genres.concat(book.genres))
  genres = [...new Set(genres)]
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.filter(book => book.genres.includes(filter) || filter === '').map((a) => (
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
