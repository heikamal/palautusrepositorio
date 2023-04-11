import { useEffect, useState } from "react"
import userService from '../services/users'
import { Link, Route, Routes, useParams } from "react-router-dom"

const Users = ({ users }) => {

	const style = {
		textAlign: 'left'
	}

	return (
		<div className='userList'>
			{users && (
				<>
					<table>
						<thead>
							<tr>
								<th></th>
								<th>blogs created</th>
							</tr>
						</thead>
						<tbody>
							{users.map(user => (
								<tr key={user.id}>
									<td style={style}><Link to={`${user.id}`}>{user.name}</Link></td>
									<td style={style}>{user.blogs.length}</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}
			
		</div>
	)
}

export default Users