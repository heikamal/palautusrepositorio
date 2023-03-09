const Course = ({ course }) => {
  console.log(course)
  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => <h2>{props.course}</h2>

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

const Total = ({ parts }) => {
  // muodosta uusi taulukko tehtävien lukumäärästä
  const exercises = parts.map(part => part.exercises)
  console.log(exercises)

  // laske taulukko yhteen reduce-funktiolla
  const initialValue = 0
  const total = exercises.reduce( (accumulator, currentValue) => accumulator + currentValue, initialValue)

  return (
    <p><b>total of {total} exercises</b></p>
  )
}

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
  const courses = [
    {
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
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
        <Course key={course.id} course={course}/>
      )}
    </div>
  )
}

export default App