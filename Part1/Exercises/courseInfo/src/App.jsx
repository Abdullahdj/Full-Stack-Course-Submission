import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function Header(props) {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

function Part(props) {
  return (
    <>
      <p>{props.part} {props.exercise}</p>
    </>
  )
}

function Content(props) {
  return (
    <>
      <Part part={props.parts[0]} exercise={props.exercises[0]}/>
      <Part part={props.parts[1]} exercise={props.exercises[1]}/>
      <Part part={props.parts[2]} exercise={props.exercises[2]}/>
    </>
  )
}

function Total(props) {
  return (
    <>
      <p>Number of Exercises {props.exercises[0] + 
      props.exercises[1] + props.exercises[2]}</p>
    </>
  )
}

function App() {
  const course = "Half Stack application devlopment"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14

  return (
    <>
      <div>
        <Header course={course}/>
        <Content parts={[part1, part2, part3]} 
        exercises={[exercises1, exercises2, exercises3]}/>
        <Total exercises={[exercises1, exercises2, exercises3]}/>
      </div>
    </>
  )
}

export default App
