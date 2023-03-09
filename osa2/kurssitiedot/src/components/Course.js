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

export default Course