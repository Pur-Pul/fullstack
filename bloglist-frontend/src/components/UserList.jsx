import { useSelector } from 'react-redux'

const UserList = () => {
	const users = useSelector((state) => {
		return state.users
	})

	return (
		<div>
			<h1>users</h1>
			<table>
				<tbody>
					<tr>
						<th>Username</th>
						<th>Blogs created</th>
					</tr>
					{users.map((user) => {
						return (
							<tr key={user.id}>
								<td>{user.username}</td>
								<td>{user.blogs.length}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default UserList
