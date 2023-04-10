import { useSelector } from "react-redux"

const Notification = () => {
	const message = useSelector(state => {
		return state.notification
	})

	if (message === null) {
		return null
	}

	return <div className="noti">{message}</div>
}

export default Notification
