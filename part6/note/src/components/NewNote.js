import { useDispatch } from "react-redux";
import { newNote } from "../reducers/noteReducer";

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();

    const content = event.target.note.value;
    event.target.note.value = "";

    dispatch(newNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note"></input>
      <button type="submit">Add</button>
    </form>
  );
};

export default NewNote;
