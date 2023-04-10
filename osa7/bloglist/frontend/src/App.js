import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogDisplay from './components/BlogDisplay'
import Error from './components/Error'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { clearUser, logUserOut, setUser } from './reducers/userReducer'

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
			<Error />
			<Notification />
			{!user && (
				<div>
					<LoginForm />
				</div>
			)}
			{user && (
				<div>
					<BlogDisplay handleLogout={handleLogout} />
				</div>
			)}
		</div>
	)
}

export default App
