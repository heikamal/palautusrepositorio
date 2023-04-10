import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const id = action.payload.id
      const blogToUpdate = action.payload.updatedBlog
      const updatedBlog = { 
        ...blogToUpdate, 
        votes: blogToUpdate.votes + 1
      }

      return state.map(blog =>
        blog.id !== id ? blog : updatedBlog
      )     
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
	filterOut(state, action){
		const id = action.payload
		return state.filter(blog => blog.id !== id)
	}
  },
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog, user) => {
  return async dispatch => {
    const returned = await blogService.createNew(newBlog)
	const freshBlog = {...returned, user: user}
    dispatch(appendBlog(freshBlog))
  }
}

export const addVote = (id, updatedBlog) => {
	return async dispatch => {
		await blogService.update(id, updatedBlog)
		dispatch(incrementVote({id, updatedBlog}))
	} 
}

export const removeBlog = (id) => {
	return async dispatch => {
		await blogService.remove(id)
		dispatch(filterOut(id))
	}
}

export const { toggleImportanceOf, appendBlog, setBlogs, incrementVote, filterOut } = blogSlice.actions

export default blogSlice.reducer