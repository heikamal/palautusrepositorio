const Person = ({ person, onClickHandle }) => {
    return (
      <p>{person.name} {person.number} <button onClick={() => onClickHandle(person.name, person.id)}>delete</button></p>
    )
}
  
const Persons = ({ peopleToShow, deleteHandle }) => {
    return (
      <div>
        {peopleToShow.map(person =>
        <Person key={person.name} 
        person={person}
        onClickHandle={deleteHandle} 
        />)}
      </div>
    )
}

export default Persons