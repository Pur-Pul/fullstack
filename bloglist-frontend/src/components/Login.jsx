import { useState } from "react"

const LoginForm = ({performLogin}) => {
    const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

    const loginHandler = (event) => {
        event.preventDefault()
        performLogin({
            username : username,
            password : password
        })
        setUsername('')
        setPassword('')
    }

	return (
		<div>
			<h1>login to application</h1>
			<form onSubmit={loginHandler}>
				<div>
					username
						<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
						<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default LoginForm