import Blog from './Blog'
import BlogForm from './BlogForm'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { addVote, createBlog, removeBlog, setBlogs } from '../reducers/blogReducer'

const BlogDisplay = ({ user, handleLogout }) => {
	const dispatch = useDispatch()

	// haetut blogit
	const blogs = useSelector(state => {
		return state.blogs
	})
	const [formVisible, setFormVisible] = useState(false)

	const hideWhenVisible = { display: formVisible ? 'none' : '' }
	const showWhenVisible = { display: formVisible ? '' : 'none' }

	const addNewBlog = (newBlog) => {
		dispatch(createBlog(newBlog, user))
		setFormVisible(false)
		showNotification(dispatch, `a new blog ${newBlog.title} by ${newBlog.author} added`)
	}


	const sortBlogs = []
		.concat(blogs)
		.sort((a, b) => (a.likes < b.likes ? 1 : -1))
		.map((blog) => (
			<Blog
				key={blog.id}
				user={user}
				blog={blog}
				updateLikes={() => updateLikes(blog)}
				handleRemoveButton={() => handleRemove(blog)}
			/>
		))

	const updateLikes = async (blog) => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		dispatch(addVote(updatedBlog.id, updatedBlog))
		showNotification(dispatch, `like added to ${updatedBlog.title}`)
	}

	const handleRemove = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			dispatch(removeBlog(blog.id))
			showNotification(dispatch, `${blog.title} removed`)
		}
	}

	return (
		<div>
			<h2>blogs</h2>
			<p>
				{user.name} logged in
				<button onClick={handleLogout}>logout</button>
			</p>
			<div style={hideWhenVisible}>
				<button onClick={() => setFormVisible(true)}>add new</button>
			</div>
			<div style={showWhenVisible}>
				<h2>create new</h2>
				<BlogForm addNewBlog={addNewBlog} />
				<button
					onClick={() => {
						setFormVisible(false)
					}}
				>
					cancel
				</button>
			</div>
			{sortBlogs}
		</div>
	)
}

BlogDisplay.propTypes = {
	user: PropTypes.object.isRequired,
	handleLogout: PropTypes.func.isRequired,
}

export default BlogDisplay
