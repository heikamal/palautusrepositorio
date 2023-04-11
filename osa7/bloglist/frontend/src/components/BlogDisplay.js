import Blog from './Blog'
import BlogForm from './BlogForm'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { addVote, createBlog, removeBlog, setBlogs } from '../reducers/blogReducer'
import { logUserOut } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const BlogDisplay = () => {
	const dispatch = useDispatch()

	const user = useSelector(state => {
		return state.user
	})

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
		.map((blog) => (<div className='blog' key={blog.id}>
			<Link
				to={`/blogs/${blog.id}`}
			>{blog.title}</Link> </div>
		))

	return (
		<div>
			
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


export default BlogDisplay
