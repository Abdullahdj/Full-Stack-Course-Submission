function Header(props) {
    return (
      <>
        <h2>{props.course}</h2>
      </>
    )
  }

function Part(props) {
return (
    <>
    <p>{props.part.name} {props.part.exercises}</p>
    </>
)
}

function Content(props) {
return (
    <>
    {props.parts.map((part) => <Part key={part.id} part={part}/>)}
    </>
)
}

function Total(props) {
return (
    <>
    <p><b> Total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b></p>
    </>
)
}

function Course({course}) {
return (
    <div>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </div>
)
}

export default Course
