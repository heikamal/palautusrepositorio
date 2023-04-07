import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const createAnecdote = (content) => { 
  const anecdote = asObject(content)
  return {
  type: 'NEW_ANECDOTE',
  payload: anecdote
  }
}

const incrementVote = (id) => {
  return {
  type: 'INCREMENT_VOTE',
  payload: { id }
  }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'NEW_ANECDOTE':
    return [...state, action.payload]
  case 'INCREMENT_VOTE':
    const id = action.payload.id
    const anecdoteToUpdate = state.find(n => n.id === id)
    const updated = { 
      ...anecdoteToUpdate, 
      votes: anecdoteToUpdate.votes + 1 
    }
    return state.map(anecdote =>
      anecdote.id !== id ? anecdote : updated 
    )
  default:
    return state
 }
}*/



const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const newAnecdotes = action.payload.anecdotes.filter(anecdote => anecdote.id !== action.payload.object.id)
      return newAnecdotes.concat(action.payload.object)
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {  
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const incrementVote = (object) => {
  return async (dispatch, getState) => {
    const newObject = {...object, votes: object.votes + 1}
    const updated = await anecdoteService.update(newObject)
    const state = getState()
    const anecdotes = state.anecdotes
    dispatch(updateAnecdote({ object: updated, anecdotes }))

  }
}

export default anecdoteSlice.reducer