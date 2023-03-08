import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handler}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const sum = good+neutral+bad
  const average = (good-bad)/(sum)
  const positive = (good/(sum))*100 + "%"

  if (sum === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={sum} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // käsittelijät jokaiselle painikkeelle
  const handleG = () => {
    const newValue = good + 1
    setGood(newValue)
  }

  const handleN = () => {
    const newValue = neutral + 1
    setNeutral(newValue)
  }

  const handleB = () => {
    const newValue = bad + 1
    setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={handleG} text="good" />
      <Button handler={handleN} text="neutral" />
      <Button handler={handleB} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
