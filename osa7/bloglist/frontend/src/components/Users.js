import { Link } from "react-router-dom"
import {
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	TableHead,
	Card,
  } from '@mui/material'

const Users = ({ users }) => {

	const style = {
		textAlign: 'left'
	}

	return (
		<div className='userList'>
			{users && (
				<>
					<TableContainer component={Card}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell style={{ fontWeight: "bold" }}>blogs created</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{users.map(user => (
									<TableRow key={user.id}>
										<TableCell style={style}><Link to={`${user.id}`}>{user.name}</Link></TableCell>
										<TableCell style={style}>{user.blogs.length}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			)}
			
		</div>
	)
}

export default Users