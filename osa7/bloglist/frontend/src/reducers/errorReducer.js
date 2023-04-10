import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
	name: 'error',
	initialState: null,
	reducers: {
		setErrorMessage(state, action) {
			const newError = action.payload
			return newError
		},
		clearError(state, action) {
			return null
		}
	}
})

export const { setErrorMessage, clearError } = errorSlice.actions

export const showError = (dispatch, message) => {
	dispatch(setErrorMessage(message))
	setTimeout(() => {
		dispatch(clearError())
	}, 5000)
	
}

export default errorSlice.reducer