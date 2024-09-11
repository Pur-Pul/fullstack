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

const Total = (props) => {
  let sum = 0
  for (let i = 0; i < props.states.length; i++) {
    sum += props.states[i]
  }
  return (
    <tr>
      <td>all</td>
      <td>{sum} %</td>
    </tr>
  )
}

const Average = (props) => {
  let sum = 0
  for (let i = 0; i < props.states.length; i++) {
    sum += props.states[i] * (-1 * (i - 1))
  }
  return (
    <tr>
      <td>average</td>
      <td>{sum} %</td>
    </tr>
  )
}

const Positive = (props) => {
  let sum = 0
  for (let i = 0; i < props.states.length; i++) {
    sum += props.states[i]
  }
  let positive = 0
  if (sum > 0) {
    positive = (props.states[0]/sum) * 100
  }
  return (
    <tr>
      <td>positive</td>
      <td>{positive} %</td>
    </tr>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const states = [props.options[0].state, props.options[1].state, props.options[2].state]
  if (states[0] == 0 && states[1] == 0 && states[2] == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <thead></thead>
        <tbody>
          <StatisticsLine text = {props.options[0].name} value = {props.options[0].state} />
          <StatisticsLine text = {props.options[1].name} value = {props.options[1].state} />
          <StatisticsLine text = {props.options[2].name} value = {props.options[2].state} />
          <Total states = {states} />
          <Average states = {states} />
          <Positive states = {states} />
        </tbody>
      </table>
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