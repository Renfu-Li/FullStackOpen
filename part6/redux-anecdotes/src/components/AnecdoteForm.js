import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import { setMessage, removeMessage } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = (e) => {
    e.preventDefault();

    const anecdote = e.target.anecdote.value;

    dispatch(create(anecdote));
    dispatch(setMessage(`You created a new note: "${anecdote}"`));
    setTimeout(() => {
      dispatch(removeMessage(""));
    }, 5000);
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
