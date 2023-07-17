import { useState, useEffect } from "react";

import personService from "./services/persons.js";

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

const PersonsNumber = ({ shownNumbers, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {shownNumbers.map((person) => (
        <SinglePerson
          key={person.id}
          person={person}
          handleDelete={handleDelete}
        ></SinglePerson>
      ))}
    </>
  );
};

const SinglePerson = ({ person, handleDelete }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </p>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([...persons]);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleFilter = (event) => {
    setFilterCriteria(event.target.value);

    const lowerFilterCritera = event.target.value.toLowerCase();

    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(lowerFilterCritera)
    );

    setFilteredPersons(filteredPersons);
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

    if (newName === "" || newNumber === "") {
      alert("You must input both Name and Number to add to phonebook");
      return;
    }

    if (currentNames.includes(newName)) {
      const confirmReplace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmReplace) {
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );
        const updatedPerson = { ...personToUpdate, number: newNumber };

        personService
          .updatePerson(personToUpdate.id, updatedPerson)
          .then((response) =>
            setPersons(
              persons.map((person) =>
                person.name === newName ? response.data : person
              )
            )
          );
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService
        .createPerson(newPerson)
        .then((response) => setPersons(persons.concat(response.data)))
        .catch((error) => console.log("Failed adding new person"));

      setNewName("");
      setNewNumber("");
    }
  };

  const handleDelete = (id) => {
    console.log(id);

    const personToDelete = persons.find((person) => person.id === id);

    console.log(personToDelete.id);
    console.log(personToDelete.name);
    console.log(persons);
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`);

    if (confirmDelete) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setFilteredPersons(
            filteredPersons.filter((person) => person.id !== id)
          );
        })
        .catch((error) => console.log("failed to delete the person"));
    }
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
        handleDelete={handleDelete}
      ></PersonsNumber>
    </div>
  );
};

export default App;
