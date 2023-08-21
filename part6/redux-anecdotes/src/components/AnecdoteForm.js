import { useDispatch } from "react-redux";
import { createNew } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = async (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    dispatch(createNew(content));
    dispatch(setNotification(`You created a new note: "${content}"`, 5000));

    e.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
