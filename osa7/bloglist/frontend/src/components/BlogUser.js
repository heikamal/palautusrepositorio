import { useParams } from "react-router-dom"

const BlogUser = ({ users }) => {
	const id = useParams().id
	let user = users.find(n => n.id === id)
	const blogs = user.blogs
	if (!user) {
		return null
	}
	
	return (
		<div>
			<h1>{user.name}</h1>
			<h3>added blogs</h3>
			<ul>
				{blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
			</ul>
		</div>
	)
	
}

export default BlogUser