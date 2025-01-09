import { useEffect, useState } from "react"
import { LOGIN_USER } from "./queries"
import { useMutation } from "@apollo/client"
const LoginForm = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ Login, result ] = useMutation(LOGIN_USER)

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem("login-token", token)
        }
    }, [result.data])

    const submit = async (e) => {
        e.preventDefault()
        Login({ variables: { username, password } })
        setUsername('')
        setPassword('')
    }
    return (
        <form onSubmit={submit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={username} onChange={({ target }) => setUsername(target.value)}></input><br/>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)}></input><br/>
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm