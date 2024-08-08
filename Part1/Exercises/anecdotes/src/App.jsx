import { useState } from 'react'
import './App.css'

function Button({text, handlePress}) {
  return <button onClick={handlePress}>{text}</button>
}

function incrementVote(selected, votes, setVotes) {
  let tempArray = [...votes]
  tempArray[selected] += 1
  setVotes(tempArray)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
   
  const [selected, setSelected] = useState(0)

  let mostVotedQuoteIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text = "vote" handlePress={() => incrementVote(selected, votes, setVotes)}/>
      <Button text = "next anecdote" handlePress= {() => setSelected(Math.floor(Math.random()*anecdotes.length))}/>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[mostVotedQuoteIndex]}</p>
    </div>
  )
}

export default App
