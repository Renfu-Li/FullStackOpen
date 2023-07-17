import axios from "axios";

const dbURL = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(dbURL);
};

const createPerson = (newPerson) => {
  return axios.post(dbURL, newPerson);
};

const updatePerson = (id, updatedPerson) => {
  return axios.put(`${dbURL}/${id}`, updatedPerson);
};

const deletePerson = (id) => {
  return axios.delete(`${dbURL}/${id}`);
};

const personService = { getAll, createPerson, deletePerson, updatePerson };

export default personService;
