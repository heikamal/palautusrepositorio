import { useState } from 'react'

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const sum = good+neutral+bad

  if (sum === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <p>good {good}<br />
      neutral {neutral}<br />
      bad {bad}<br />
      all {sum}<br />
      average {(good-bad)/(sum)}<br />
      positive {(good/(sum))*100} %</p>
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
      <button onClick={handleG}>good</button>
      <button onClick={handleN}>neutral</button>
      <button onClick={handleB}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
