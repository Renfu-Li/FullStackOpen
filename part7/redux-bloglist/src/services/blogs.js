import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (user, newBlog) => {
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const comment = async (user, blogId, comment) => {
  console.log(comment);
  const commentOjb = { content: comment };
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  };
  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    commentOjb,
    config
  );
  return response.data;
};

const update = async (user, updatedBlog) => {
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  };

  const response = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  );
  return response.data;
};

const deleteBlog = async (user, blogId) => {
  const config = {
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

export default { getAll, create, update, deleteBlog, comment };
