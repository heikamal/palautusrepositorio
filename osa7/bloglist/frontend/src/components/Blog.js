import { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Blog = ({ updateLikes, handleRemoveButton }) => {

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
				{blog.user.name}
				<br />
				{user.username === blog.user.username && (
					<button id="remove-button" onClick={() => handleRemoveButton(blog)}>
						remove
					</button>
				)}
			</p>
		</div>
	)
}

Blog.propTypes = {
	updateLikes: PropTypes.func.isRequired, 
	handleRemoveButton: PropTypes.func.isRequired
}

export default Blog
