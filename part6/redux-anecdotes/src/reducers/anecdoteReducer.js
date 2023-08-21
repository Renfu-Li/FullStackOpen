import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      const updatedAnecdote = action.payload;
      console.log(updatedAnecdote);
      return state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
    },

    create(state, action) {
      state.push(action.payload);
    },

    set(state, action) {
      return action.payload;
    },
  },
});

export const { vote, create, set } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(set(anecdotes));
  };
};

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(create(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(id);
    dispatch(vote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
