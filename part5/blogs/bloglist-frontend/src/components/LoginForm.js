import { useState } from "react";
import login from "../services/login.js";

const LoginForm = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userInfo = await login({ username, password });
      setUser(userInfo);

      window.localStorage.setItem("loggedInUser", JSON.stringify(userInfo));

      setUsername("");
      setPassword("");
      setMessage("Logged in successfully");
    } catch (exceptions) {
      setMessage("Wrong username or password");
      setTimeout(() => setMessage(""), 5000);
      console.log("invalid credentials");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsername}
        ></input>
      </div>
      <div>
        password
        <input
          type="text"
          id="password"
          value={password}
          onChange={handlePassword}
        ></input>
      </div>
      <button id="loginButton">login</button>
    </form>
  );
};

export default LoginForm;
