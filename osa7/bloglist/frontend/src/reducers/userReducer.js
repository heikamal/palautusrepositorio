import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
	name: 'user',
  	initialState: null,
  	reducers: {
		setUser(state, action) {
			return action.payload
		},
		clearUser(state, action) {
			return null
		}
	}
})

export const { setUser, clearUser } = userSlice.actions

export const logUserIn = (credentials) => {
	return async dispatch => {
		const user = await loginService.login(credentials)
		window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
		blogService.setToken(user.token)
		dispatch(setUser(user))
	}
}

export const logUserOut = () => {
	return dispatch => {
		window.localStorage.removeItem('loggedBloglistUser')
		dispatch(clearUser())
		blogService.setToken(null)
	}
}

export default userSlice.reducer