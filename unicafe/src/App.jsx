import { useState } from 'react'

const Button = (props) => {
  return (<button onClick={() => props.set(props.state + 1)}>{props.label}</button>)
}

const Feedback = (props) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button state={props.options[0].state} set={props.options[0].set} label={props.options[0].name}></Button>
      <Button state={props.options[1].state} set={props.options[1].set} label={props.options[1].name}></Button>
      <Button state={props.options[2].state} set={props.options[2].set} label={props.options[2].name}></Button>
    </div>
  )
}

const Stat = (props) => {
  return (<p>{props.label} {props.state}</p>)
}

const Statistics = (props) => {
  return (
    <div>
      <Stat label = {props.options[0].name} state = {props.options[0].state}></Stat>
      <Stat label = {props.options[1].name} state = {props.options[1].state}></Stat>
      <Stat label = {props.options[2].name} state = {props.options[2].state}></Stat>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  class Option {
    constructor(name, state, set_function) {
      this.name = name
      this.state = state
      this.set = set_function
    }
  }
  const options = [
    new Option("good", good, setGood),
    new Option("neutral", neutral, setNeutral),
    new Option("bad", bad, setBad)
  ]

  return (
    <div>
      <Feedback options={options} />
      <Statistics options={options} />
    </div>
  )
}

export default App