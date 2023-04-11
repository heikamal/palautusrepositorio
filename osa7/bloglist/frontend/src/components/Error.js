import { Alert } from "@mui/material"
import { useSelector } from "react-redux"

const Error = () => {
	const message = useSelector(state => {
		return state.error
	})

	if (message === null) {
		return null
	}

	return <Alert severity="error" className="error">{message}</Alert>
}

export default Error
