import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      // laiska tapa
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updateAnecdoteMutation.mutate(newAnecdote)
  }

  const result = useQuery('anecdotes', getAnecdotes, { retry: 1, refetchOnWindowFocus: false })

  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in the server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
