import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Header({text}) {
  return <h1>{text}</h1>
}

function Button({text, handlePress}) {
  return <button onClick={handlePress}>{text}</button>
}

function StatisticLine({text, value, closingText}) {

  return (
    <tr>
      <td>{text}</td>
      <td>{value} {closingText}</td>
    </tr>
  )
}

function Statistics({good, neutral, bad}) {
  let all = good + bad + neutral

  if (all === 0) { 
    return (
      <>
        <p>No feedback given</p>
      </>
    ) 
  }

  return (
    <>
      <table>
        <tbody>
          <StatisticLine text = "good" value = {good}/>
          <StatisticLine text = "neutral" value = {neutral}/>
          <StatisticLine text = "bad" value = {bad}/>
          <StatisticLine text = "all" value = {all}/>
          <StatisticLine text = "average" value = {(good - bad)/all}/>
          <StatisticLine text = "positive" value = {good/all*100} closingText = "%"/>
        </tbody>
      </table>
    </>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <>
      <Header text = "give feedback"/>
      <Button text = "good" handlePress={() => setGood(good + 1)}/>
      <Button text = "neutral" handlePress={() => setNeutral(neutral + 1)}/>
      <Button text = "bad" handlePress={() => setBad(bad + 1)}/>
      <Header text = "statistics"/>
      <Statistics good = {good} bad = {bad} neutral = {neutral}/>
    </>
  )
}

export default App
