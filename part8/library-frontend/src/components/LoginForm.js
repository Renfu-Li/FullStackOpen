import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { useEffect } from "react";

const LoginForm = ({ setToken, show }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;

      localStorage.setItem("userToken", token);
      setToken(token);
    }
  }, [result.data]);

  const onLogin = (e) => {
    e.preventDefault();

    login({
      variables: { username: name, password },
    });

    setName("");
    setPassword("");
  };

  if (show === false) {
    return null;
  }

  return (
    <div>
      <div>
        name
        <input value={name} onChange={(e) => setName(e.target.value)}></input>
      </div>

      <div>
        password
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>

      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
