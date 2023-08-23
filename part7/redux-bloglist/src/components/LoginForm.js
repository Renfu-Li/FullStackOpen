import { useState } from "react";
import { useDispatch } from "react-redux";
import login from "../services/login.js";
import { setUser } from "../reducers/userReducer.js";
import { setNotification } from "../reducers/notificationReducer.js";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

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
      dispatch(setUser(userInfo));

      window.localStorage.setItem("loggedInUser", JSON.stringify(userInfo));

      setUsername("");
      setPassword("");

      dispatch(setNotification("Logged in successfully!"));
      setTimeout(() => dispatch(setNotification("")), 5000);
    } catch (exceptions) {
      dispatch(setNotification("Wrong username or password"));
      setTimeout(() => dispatch(setNotification("")), 5000);
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
