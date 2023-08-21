import { createSlice } from "@reduxjs/toolkit";
import noteService from "../services/notes";

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const changedNote = action.payload;

      return state.map((note) =>
        note.id === changedNote.id ? changedNote : note
      );
    },

    appendNote(state, action) {
      state.push(action.payload);
    },

    setNotes(state, action) {
      return action.payload;
    },
  },
});

// export const createNote = (content) => {
//   return {
//     type: "NEW_NOTE",
//     payload: {
//       content,
//       important: false,
//       id: generateId(),
//     },
//   };
// };

// export const toggleImportanceOf = (id) => {
//   return {
//     type: "TOGGLE_IMPORTANCE",
//     payload: { id },
//   };
// };

// const noteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "NEW_NOTE":
//       return [...state, action.payload];
//     case "TOGGLE_IMPORTANCE": {
//       return state.map((note) =>
//         note.id === action.payload.id
//           ? { ...note, important: !note.important }
//           : note
//       );
//     }
//     default:
//       return state;
//   }
// };

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const newNote = (content) => {
  return async (dispatch) => {
    const createdNote = await noteService.createNote(content);
    dispatch(appendNote(createdNote));
  };
};

export default noteSlice.reducer;
