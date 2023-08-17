import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setMessage, removeMessage } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotesList = useSelector((state) => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  anecdotesList.sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id));
    dispatch(setMessage(`you voted "${anecdote.content}"`));
    setTimeout(() => {
      dispatch(removeMessage(""));
    }, 5000);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotesList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
