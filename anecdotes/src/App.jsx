import { useState } from 'react'

const Button = (props) => {
  return (<button onClick={() => {
    let votes = [...props.state]
    votes[props.current_anecdote]++
    props.set(votes)
  }}>{props.label}</button>)
}

const RandomButton = (props) => {
  function random_integer(max) {
    const rand_int = Math.floor(Math.random() * max);
    return rand_int
  }
  return (<button onClick={() => {
    const next_anecdote = random_integer(props.anecdotes.length)
    props.set(next_anecdote)
  }}>{props.label}</button>)
}

const Votes = (props) => {
  return(<div>has {props.votes[props.selected]} votes</div>)
}

const Anecdote = (props) => {
  return (
    <div>
      <h1>{props.heading}</h1>
      <div>{props.anecdotes[props.selected]}</div>
      <Votes votes={props.votes} selected={props.selected} />
    </div>
  )
}

const App = () => {
  const [votes, setVote] = useState([0,0,0,0,0,0,0,0])
  const [selected, setSelected] = useState(0)
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
  
  function index_of_max(arr) {
    let max = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[max])
        max = i
    }
    return max
  }

  return (
    <div>
      <Anecdote heading = "Anecdote of the day" anecdotes = {anecdotes} votes = {votes} selected = {selected} />
      <Button set = {setVote} state = {votes} label = {"vote"} current_anecdote = {selected}/>
      <RandomButton set = {setSelected} state = {selected} anecdotes = {anecdotes} label = {"next anecdote"} vote_set = {setVote}/>
      <Anecdote heading = "Anecdote with most votes" anecdotes = {anecdotes} votes = {votes} selected = {index_of_max(votes)} />
    </div>
  )
}

export default App