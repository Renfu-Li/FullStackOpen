import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (user, blog) => {
  console.log(user);

  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  };

  const response = await axios.post(baseUrl, blog, config);
  console.log(response.data);
  return response.data;
};

export default { getAll, create };
