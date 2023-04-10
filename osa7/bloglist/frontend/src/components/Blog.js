import { useState } from 'react'
import TogglableButton from './TogglableButton'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Blog = ({ blog, updateLikes, handleRemoveButton }) => {
	const user = useSelector(state => {
		return state.user
	})
	const [blogInfoVisible, setBlogInfoVisible] = useState(false)
	const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

	return (
		<div className="blog">
			{blog.title} {blog.author}{' '}
			<TogglableButton
				state={blogInfoVisible}
				handler1={() => setBlogInfoVisible(false)}
				handler2={() => setBlogInfoVisible(true)}
				text1="hide"
				text2="view"
			/>
			<div className="toggle-view" style={showWhenVisible}>
				<p>
					{blog.url}
					<br />
					likes: {blog.likes}{' '}
					<button id="like-button" onClick={updateLikes}>
						like
					</button>
					<br />
					{blog.user.name}
					<br />
					{user.username === blog.user.username && (
						<button id="remove-button" onClick={handleRemoveButton}>
							remove
						</button>
					)}
				</p>
			</div>
		</div>
	)
}

Blog.propTypes = {
	user: PropTypes.object.isRequired,
	blog: PropTypes.object.isRequired,
	updateLikes: PropTypes.func.isRequired,
	handleRemoveButton: PropTypes.func.isRequired,
}

export default Blog
