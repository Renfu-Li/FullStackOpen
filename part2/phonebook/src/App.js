import { useState } from "react";

const Filter = ({ filterCriteria, handleFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={filterCriteria} onChange={handleFilter}></input>
    </div>
  );
};

const AddPerson = ({
  newName,
  handleNameInput,
  newNumber,
  handleNumberInput,
  handleAdd,
}) => {
  return (
    <>
      <h1>Add a new</h1>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput}></input>
        </div>
        <div>
          <button type="submit" onClick={handleAdd}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

const PersonsNumber = ({ shownNumbers }) => {
  return (
    <>
      <h2>Numbers</h2>
      {shownNumbers.map((person) => (
        <SinglePerson key={person.name} person={person}></SinglePerson>
      ))}
    </>
  );
};

const SinglePerson = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: 123456 },
    { name: "Dumb Trump", number: 131313 },
    { name: "Idiot Trump", number: 747474 },
    { name: "Dead Putin", number: 444444 },
  ]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([...persons]);

  const handleFilter = (event) => {
    setFilterCriteria(event.target.value);

    const lowerFilterCritera = event.target.value.toLowerCase();

    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(lowerFilterCritera)
      )
    );
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleAdd = (event) => {
    event.preventDefault();

    const currentNames = persons.map((person) => person.name);
    if (currentNames.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    if (newName === "" || newNumber === "") {
      alert("You must input both Name and Number to add to phonebook");
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterCriteria={filterCriteria}
        handleFilter={handleFilter}
      ></Filter>

      <AddPerson
        newName={newName}
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
        handleAdd={handleAdd}
      ></AddPerson>

      <PersonsNumber
        shownNumbers={filterCriteria === "" ? persons : filteredPersons}
      ></PersonsNumber>
    </div>
  );
};

export default App;
