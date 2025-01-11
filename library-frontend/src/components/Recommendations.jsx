import { useQuery } from "@apollo/client"
import { CURRENT_USER } from "./queries"
import { ALL_BOOKS } from "./queries"

const Recommendations = () => {
    const user_result = useQuery(CURRENT_USER, { pollInterval: 2000 })
    const result = useQuery(ALL_BOOKS, { pollInterval: 2000 })
    if (result.loading || user_result.loading) {
        return <div>loading...</div>
    }
    if (!user_result.data.me) {
        console.log(localStorage.getItem('login-token'))
        return <div>you are not logged in</div>
    }
    const current_user = user_result.data.me
    console.log(current_user)
    const books = result.data.allBooks
    return (
        <div>
            <h2>recommendations</h2>
            <p>books based on you favorite genre: {current_user.favoriteGenre}</p>
            <table>
            <tbody>
                <tr>
                    <th>title</th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.filter(book => book.genres.includes(current_user.favoriteGenre)).map((a) => (
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