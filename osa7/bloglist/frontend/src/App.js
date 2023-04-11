import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import BlogDisplay from './components/BlogDisplay'
import Error from './components/Error'
import Notification from './components/Notification'
import Users from './components/Users'
import BlogUser from './components/BlogUser'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { clearUser, logUserOut, setUser } from './reducers/userReducer'
import {
	BrowserRouter as Router,
	Routes, Route, Link, useParams
  } from 'react-router-dom'

const App = () => {
	const dispatch = useDispatch()
	const [users, setUsers] = useState(null)

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
		userService.getAll().then(result => {
			setUsers(result)
		})
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
						<Route path="/users" element={<Users users={users} />} />
						<Route path="/users/:id" element={<BlogUser users={users} />} />
					</Routes>
				</div>
			)}
		</div>
	)
}

export default App
