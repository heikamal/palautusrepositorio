import { useSelector } from "react-redux"

const Error = () => {
	const message = useSelector(state => {
		return state.error
	})

	if (message === null) {
		return null
	}

	return <div className="error">{message}</div>
}

export default Error
