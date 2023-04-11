import BlogForm from './BlogForm'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import {  createBlog } from '../reducers/blogReducer'

import { Link } from 'react-router-dom'
import { Paper, TableBody, TableCell, TableRow, TableContainer, Table, Button } from '@mui/material'

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
		.map((blog) => (
			<TableRow className='blog' key={blog.id}>
				<TableCell>
					<Link
						to={`/blogs/${blog.id}`}
					>{blog.title}
					</Link>
				</TableCell> 
			</TableRow>
		))

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button variant="contained" onClick={() => setFormVisible(true)}>add new</Button>
			</div>
			<div style={showWhenVisible}>
				<h2>create new</h2>
				<BlogForm addNewBlog={addNewBlog} /> <br/>
				<Button variant="contained"
					onClick={() => {
						setFormVisible(false)
					}}
				>
					cancel
				</Button>
			</div>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						{sortBlogs}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}


export default BlogDisplay
