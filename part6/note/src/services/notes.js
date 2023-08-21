import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNote = async (content) => {
  const newNote = { content, important: false };
  const response = await axios.post(baseUrl, newNote);
  return response.data;
};

const toggleImportance = async (id) => {
  const getNoteResponse = await axios.get(`${baseUrl}/${id}`);
  const noteToUpdate = getNoteResponse.data;

  const updatedNote = { ...noteToUpdate, important: !noteToUpdate.important };
  const response = await axios.put(`${baseUrl}/${id}`, updatedNote);
  return response.data;
};
export default { getAll, createNote, toggleImportance };
