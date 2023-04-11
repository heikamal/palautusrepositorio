import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showError } from '../reducers/errorReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { logUserIn, setUser } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Button, TextField } from '@mui/material'

const LoginForm = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	// loginin handleri
	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
			blogService.setToken(user.token)
			dispatch(setUser(user))
			showNotification(dispatch, 'logged in')
			setUsername('')
			setPassword('')
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
					<TextField label="username"
						id="username"
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					<TextField label="password"
						id="password"
						type="test"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<Button variant="contained" color="primary" id="login-button" type="submit">
					login
				</Button>
			</form>
		</div>
	)
}

export default LoginForm