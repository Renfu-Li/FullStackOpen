import { useQuery, useSubscription, useApolloClient } from "@apollo/client";
import { useState } from "react";
import PersonForm from "./components/PersonForm";
import PhonrForm from "./components/PhoneForm";
import LoginForm from "./components/LoginForm";
import { ALL_PERSONS, FIND_PERSON, PERSON_ADDED } from "./quries";

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

const Persons = ({ persons }) => {
  const [nameToSearch, setNamesToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNamesToSearch(null)}
      ></Person>
    );
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.phone}
          <button onClick={() => setNamesToSearch(person.name)}>
            show address
          </button>
        </div>
      ))}
    </div>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null;
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(null);
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded;
      notify(`${addedPerson.name} added`);

      client.cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(addedPerson),
        };
      });
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage}></Notify>
        <LoginForm setToken={setToken} setError={setErrorMessage}></LoginForm>
      </div>
    );
  }

  return (
    <div className="App">
      <Notify errorMessage={errorMessage}></Notify>
      <button onClick={logout}>Logout</button>
      <Persons persons={result.data.allPersons}></Persons>
      <PersonForm setError={notify}></PersonForm>
      <PhonrForm setError={notify}></PhonrForm>
    </div>
  );
}

export default App;
