import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

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
				<button id="like-button" onClick={() => updateLikes(blog)}>
					like
				</button>
				<br />
				added by {blog.user.name}
				<br />
				{user.username === blog.user.username && (
					<button id="remove-button" onClick={() => handleRemoveButton(blog)}>
						remove
					</button>
				)}
			</p>

			<h3>comments</h3>
			<form onSubmit={commentHandler}>
				<input
				id="comment"
				type="text"
				value={comment}
				name="Comment"
				onChange={({ target }) => setComment(target.value)}
				/>
				<button type='submit'>add comment</button>
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
