import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogDisplay from './components/BlogDisplay'
import Error from './components/Error'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
	const dispatch = useDispatch()

	// haetaan blogit
	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	//kirjautuminen
	const [user, setUser] = useState(null)

	// haetaan kirjautunut käyttäjä jos sellaista on
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	// logoutin handleri
	const handleLogout = (event) => {
		event.preventDefault()
		console.log('logging out')
		window.localStorage.removeItem('loggedBloglistUser')
		setUser(null)
		blogService.setToken(null)
	}

	return (
		<div>
			<Error />
			<Notification />
			{!user && (
				<div>
					<LoginForm setUser={setUser} />
				</div>
			)}
			{user && (
				<div>
					<BlogDisplay user={user} handleLogout={handleLogout} />
				</div>
			)}
		</div>
	)
}

export default App
