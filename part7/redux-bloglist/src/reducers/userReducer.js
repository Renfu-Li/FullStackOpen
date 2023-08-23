import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload;
    },
  },
});

export const { set, logout } = userSlice.actions;

export const setUser = (user) => {
  return (dispatch) => {
    dispatch(set(user));
  };
};

export default userSlice.reducer;
