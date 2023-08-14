import { useState, useEffect, useRef } from "react";

import Note from "./components/Note";
import NoteForm from "./components/NoteForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";

import noteService from "./services/notes";
import login from "./services/login";

const App = () => {
  const [notes, setNotes] = useState([]);

  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const createNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService
      .create(noteObject)
      .then((returnedNote) => setNotes(notes.concat(returnedNote)));
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login({ username, password });

      setUser(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      noteService.setToken(user.token);

      setUsername("");
      setPassword("");
    } catch (exceptions) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        <Togglable buttonLabel={"Log in"}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={(event) => setUsername(event.target.value)}
            handlePasswordChange={(event) => setPassword(event.target.value)}
            handleSubmit={handleLogin}
          ></LoginForm>
        </Togglable>
      ) : (
        <>
          <p>{user.username} logged in</p>
          <Togglable buttonLabel={"Create New Note"} ref={noteFormRef}>
            <NoteForm createNote={createNote}></NoteForm>
          </Togglable>
        </>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
      </ul>

      <Footer />
    </div>
  );
};

export default App;
