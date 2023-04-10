import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { showError } from '../reducers/errorReducer'

const LoginForm = ({ setUser }) => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	// loginin handleri
	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)

		try {
			const user = await loginService.login({
				username,
				password,
			})

			window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

			blogService.setToken(user.token)
			setUser(user)
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

LoginForm.propTypes = {
	setUser: PropTypes.func.isRequired,
}

export default LoginForm
