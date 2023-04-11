import { Alert } from "@mui/material"
import { useSelector } from "react-redux"

const Notification = () => {
	const message = useSelector(state => {
		return state.notification
	})

	if (message === null) {
		return null
	}

	return <Alert severity="success" className="noti">{message}</Alert>
}

export default Notification
