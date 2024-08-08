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

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>
        plus
      </button>
    </div>
  )
}

export default App
