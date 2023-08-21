import { useQuery, useMutation, useQueryClient } from "react-query";
import { getNotes, createNote, updateNote } from "./requests";

function App() {
  const queryClient = useQueryClient();

  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueriesData("notes");
      queryClient.setQueriesData("notes", notes.concat(newNote));
    },
  });

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.value;
    event.target.value = "";
    newNoteMutation.mutate({
      content,
      important: true,
    });
  };

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({
      ...note,
      important: !note.important,
    });
  };

  const result = useQuery("notes", getNotes);
  console.log(result);

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note"></input>
        <button type="submit">add</button>
      </form>

      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong>{note.important ? "important" : ""}</strong>
        </li>
      ))}
    </div>
  );
}

export default App;
