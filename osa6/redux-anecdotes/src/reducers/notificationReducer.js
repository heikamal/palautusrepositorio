import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		notificationChange(state, action) {
			const notification = action.payload
			return notification
		},
		resetNotification(state, action) {
			return null
		}
	}
})

export const { notificationChange, resetNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
	return dispatch => {
	  dispatch(notificationChange(message))
	  setTimeout(() => {
		dispatch(resetNotification())
	}, time * 1000)
	}
}

export default notificationSlice.reducer