import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Button, TextField } from '@mui/material'

const Blog = ({ updateLikes, handleRemoveButton }) => {
	const dispatch = useDispatch()

	const [comment, setComment] = useState('')

	const blogs =  useSelector(state => {
		return state.blogs
	})

	const id = useParams().id
	let blog = blogs.find(n => n.id === id)
	const user = useSelector(state => {
		return state.user
	})

	if (!user) {
		return null
	}
	if (!blog) {
		return null
	}

	const commentHandler = (event) => {
		event.preventDefault()
		// rakennetaan kommentit uudestaan täällä koska en saanut backendissä toimimaan kommentin lisäystä
		const newComments = [...blog.comments, comment]
		const updatedBlog = { ...blog, comments: newComments}
		dispatch(addComment(updatedBlog.id, updatedBlog))
		showNotification(dispatch, `added comment "${comment}"`)
		setComment('')
	}

	return (
		<div>
			<h1>{blog.title}</h1>
			<p>
				{blog.url}
				<br />
				likes: {blog.likes}{' '}
				<Button variant='outlined' id="like-button" onClick={() => updateLikes(blog)}>
					like
				</Button>
				<br />
				added by {blog.user.name}
				<br />
				{user.username === blog.user.username && (
					<Button variant='outlined' id="remove-button" onClick={() => handleRemoveButton(blog)}>
						remove
					</Button>
				)}
			</p>

			<h3>comments</h3>
			<form onSubmit={commentHandler}>
				<TextField variant='standard' label="comment"
				id="comment"
				type="text"
				value={comment}
				name="Comment"
				onChange={({ target }) => setComment(target.value)}
				/>
				<Button variant='outlined' type='submit'>add comment</Button>
			</form>
			<ul>
				{blog.comments.map(comment => (
					<li key={blog.comments.indexOf(comment)}>{comment}</li>
				))}
			</ul>
		</div>
	)
}

Blog.propTypes = {
	updateLikes: PropTypes.func.isRequired, 
	handleRemoveButton: PropTypes.func.isRequired
}

export default Blog
