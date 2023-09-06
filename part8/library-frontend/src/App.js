import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

import Recommendation from "./components/Recommendation";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  const onLogout = () => {
    setPage("authors");
    localStorage.clear();
    setToken(null);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        {token ? (
          <>
            <button onClick={() => setPage("addBook")}>Add Book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>Login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <LoginForm show={page === "login"} setToken={setToken}></LoginForm>

      <NewBook show={page === "addBook"} />

      <Recommendation show={page === "recommend"} />
    </div>
  );
};

export default App;
