const Person = ({ person }) => {
    return (
      <p>{person.name} {person.number}</p>
    )
}
  
const Persons = ({ peopleToShow }) => {
    return (
      <div>
        {peopleToShow.map(person =>
        <Person key={person.name} person={person} />)}
      </div>
    )
}

export default Persons