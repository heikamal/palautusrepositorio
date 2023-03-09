const Course = ({ course }) => {
  console.log(course)
  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      {/*<Total parts={course.parts} />*/}
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

const Content = ({ parts }) => {
  console.log(parts)
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} nimi={part.name} tMaara={part.exercises} />
      )}
    </div>
  )
}

{/*
const Total = (props) => {
  console.log(props)
  return <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
}*/}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.nimi} {props.tMaara}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id:3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App