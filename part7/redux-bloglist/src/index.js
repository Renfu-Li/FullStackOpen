import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import notificationReducer from "./reducers/notificationReducer.js";
import blogsReducer from "./reducers/blogsReducer.js";
import userReducer from "./reducers/userReducer.js";
import { BrowserRouter } from "react-router-dom";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
