const LoginForm = (props) => {
	return (
		<div>
			<h1>log in to application</h1>
			<form onSubmit={props.loginHandler}>
				<div>
					username
						<input
						type="text"
						value={props.username}
						name="Username"
						onChange={({ target }) => props.setUsername(target.value)}
					/>
				</div>
				<div>
					password
						<input
						type="password"
						value={props.password}
						name="Password"
						onChange={({ target }) => props.setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default LoginForm