import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import noteService from "../services/notes";

const Note = ({ note, handleclick }) => {
  return (
    <li onClick={handleclick}>
      {note.content} {note.id}
      <strong>{note.important ? " important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(({ filter, notes }) => {
    if (filter === "ALL") {
      return notes;
    } else if (filter === "IMPORTANT") {
      return notes.filter((note) => note.important);
    } else {
      return notes.filter((note) => !note.important);
    }
  });

  const toggleImportance = async (id) => {
    const newNote = await noteService.toggleImportance(id);
    dispatch(toggleImportanceOf(newNote));
  };

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleclick={() => toggleImportance(note.id)}
        ></Note>
      ))}
    </ul>
  );
};

export default Notes;
