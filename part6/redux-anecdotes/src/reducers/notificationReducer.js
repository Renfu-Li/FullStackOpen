import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage(state, action) {
      const message = action.payload;
      return message;
    },

    removeMessage(state, action) {
      return action.payload;
    },
  },
});

export const { setMessage, removeMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
