import Select from "react-select";
import { useQuery, useMutation } from "@apollo/client";
import { AUTHORS, BOOKS, UPDATE_AUTHOR } from "../queries";
import { useState } from "react";

const SetBorn = ({ authorNames }) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState("");

  const options = authorNames.map((authorName) => {
    return { value: authorName, label: authorName };
  });

  const [updateBorn] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: AUTHORS }, { query: BOOKS }],
  });

  const updateAuthor = (e) => {
    e.preventDefault();

    updateBorn({
      variables: {
        name: name.value,
        born: Number(born),
      },
    });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <Select
        options={options}
        value={name}
        onChange={(name) => setName(name)}
      ></Select>
      <div>
        born{" "}
        <input value={born} onChange={(e) => setBorn(e.target.value)}></input>
      </div>
      <button onClick={updateAuthor}>update author</button>
    </div>
  );
};

const Authors = (props) => {
  const result = useQuery(AUTHORS);
  if (result.loading) return <p>Loading...</p>;
  const authors = result.data.allAuthors;

  const authorNames = authors.map((author) => author.name);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SetBorn authorNames={authorNames}></SetBorn>
    </div>
  );
};

export default Authors;
