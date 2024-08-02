import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Hello(props) {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age}</p>
    </div>
  )
}

function App() {
  console.log("sup hoe")
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)

  return (
    <>
      <div>
        <p>It is currently {now.toString()}</p>
        <p></p>
        <p>{a} plus {b} is {a + b}</p>
        <p></p>
        <Hello name="Jimmy" age="9"/>
      </div>
    </>
  )
}

export default App
