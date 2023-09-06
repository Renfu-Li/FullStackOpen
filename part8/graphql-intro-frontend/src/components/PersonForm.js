import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { ALL_PERSONS, CREATE_PERSON } from "../quries";

const PersonForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      const messages = error.graphQLErrors[0].message;
      setError(messages);
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(response.data.addPerson),
        };
      });
    },
  });

  const submit = (event) => {
    event.preventDefault();
    createPerson({
      variables: {
        name,
        phone,
        street,
        city,
      },
    });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      <h2>create new person</h2>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
          phone{" "}
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>
        <div>
          street{" "}
          <input
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          ></input>
        </div>
        <div>
          city{" "}
          <input value={city} onChange={(e) => setCity(e.target.value)}></input>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default PersonForm;
