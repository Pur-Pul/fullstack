import { useQuery } from "@apollo/client"
import { BOOKS_BY_GENRE } from "./queries"

const Recommendations = ({ genre }) => {
    const result = useQuery(BOOKS_BY_GENRE, { variables: { genre: genre }, pollInterval: 2000 })
    if (result.loading) {
        return <div>loading...</div>
    }
    const books = result.data.allBooks
    return (
        <div>
            <h2>recommendations</h2>
            <p>books based on you favorite genre: {genre}</p>
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
        </div>
    )
}

export default Recommendations