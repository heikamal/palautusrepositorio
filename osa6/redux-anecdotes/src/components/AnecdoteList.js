import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	
	const dispatch = useDispatch()

	const anecdotes = useSelector(state => {
		return state.filter === '' 
			? state.anecdotes 
			: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
		
	})

	const arrayForSort = [...anecdotes]

	const vote = (anecdote) => {
		dispatch(incrementVote(anecdote))
		dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
	}

	return (
		<div>
			{arrayForSort.sort((a, b) => b.votes - a.votes)
				.map(anecdote =>
				<div key={anecdote.id}>
				<div>
					{anecdote.content}
				</div>
				<div>
					has {anecdote.votes}
					<button onClick={() => vote(anecdote)}>vote</button>
				</div>
				</div>
			)}
		</div>
	)
}

export default AnecdoteList