import { useState } from 'react'

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
      <p>good {good}<br />
      neutral {neutral}<br />
      bad {bad}<br />
      all {good+neutral+bad}<br />
      average {(good-bad)/(good+neutral+bad)}<br />
      positive {(good/(good+neutral+bad))*100} %</p>
    </div>
  )
}

export default App
