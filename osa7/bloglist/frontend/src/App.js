import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import BlogDisplay from './components/BlogDisplay'
import Error from './components/Error'
import Notification from './components/Notification'
import Users from './components/Users'
import BlogUser from './components/BlogUser'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { addVote, initializeBlogs, removeBlog } from './reducers/blogReducer'
import { clearUser, logUserOut, setUser } from './reducers/userReducer'
import {
	BrowserRouter as Router,
	Routes, Route, Link, useParams, useNavigate
  } from 'react-router-dom'
import { showNotification } from './reducers/notificationReducer'

const App = () => {
	const dispatch = useDispatch()
	const [users, setUsers] = useState(null)
	const navigate = useNavigate()

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

	const updateLikes = async (blog) => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		dispatch(addVote(updatedBlog.id, updatedBlog))
		
		showNotification(dispatch, `like added to ${updatedBlog.title}`)
		
	}

	const handleRemove = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			dispatch(removeBlog(blog.id))
			showNotification(dispatch, `${blog.title} removed`)
			navigate('/')
		}
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
						<Route path="/blogs/:id" element={<Blog updateLikes={updateLikes} handleRemoveButton={handleRemove} />} />
					</Routes>
				</div>
			)}
		</div>
	)
}

export default App