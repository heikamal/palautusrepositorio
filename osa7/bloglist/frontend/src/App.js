import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import BlogDisplay from './components/BlogDisplay'
import Error from './components/Error'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { clearUser, logUserOut, setUser } from './reducers/userReducer'
import {
	BrowserRouter as Router,
	Routes, Route, Link
  } from 'react-router-dom'

const Users = () => {
	const [users, setUsers] = useState(null)

	useEffect(() => {
		userService.getAll().then(result => {
			setUsers(result)
		})
	}, [])

	const style = {
		textAlign: 'left'
	}

	return (
		<div className='userList'>
			{users && (
				<table>
					<thead>
						<tr>
							<th></th>
							<th>blogs created</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user.id}>
								<td style={style}>{user.name}</td>
								<td style={style}>{user.blogs.length}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

const App = () => {
	const dispatch = useDispatch()

	// haetaan blogit
	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	//kirjautuminen
	const user = useSelector(state => {
		return state.user
	})

	// haetaan kirjautunut käyttäjä jos sellaista on
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
			blogService.setToken(user.token)
		}
	}, [])

	// logoutin handleri
	const handleLogout = (event) => {
		event.preventDefault()
		console.log('logging out')
		dispatch(logUserOut())
	}

	return (
		<div>
			<h2>blogs</h2>
			<Error />
			<Notification />
			{!user && (
				<div>
					<LoginForm />
				</div>
			)}
			{user && (
				<div>
					<p>
						{user.name} logged in
						<button onClick={handleLogout}>logout</button>
					</p>
					<Routes>
						<Route path="/" element={<BlogDisplay />} />
						<Route path="/users" element={<Users />} />
					</Routes>
				</div>
			)}
		</div>
	)
}

export default App
