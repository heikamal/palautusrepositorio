import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		setNotificationMessage(state, action) {
			const newNotification = action.payload
			return newNotification
		},
		clearNotification(state, action) {
			return null
		}
	}
})

export const { setNotificationMessage, clearNotification } = notificationSlice.actions

export const showNotification = (dispatch, message) => {
	dispatch(setNotificationMessage(message))
	setTimeout(() => {
		dispatch(clearNotification())
	}, 5000)
	
}

export default notificationSlice.reducer