import axios from "axios";

const login = async (credentials) => {
  const user = await axios.post("/api/login", credentials);
  return user.data;
};

export default login;
