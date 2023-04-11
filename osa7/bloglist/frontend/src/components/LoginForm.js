import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showError } from '../reducers/errorReducer'
import { logUserIn } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	// loginin handleri
	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			dispatch(logUserIn({ username, password }))
			setUsername('')
			setPassword('')
			showNotification(dispatch, 'logged in')
		} catch (exception) {
			showError(dispatch, 'wrong username or password')
			setUsername('')
			setPassword('')
		}
	}

	return (
		<div>
			<h2>log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						id="username"
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						id="password"
						type="test"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button id="login-button" type="submit">
					login
				</button>
			</form>
		</div>
	)
}

export default LoginForm