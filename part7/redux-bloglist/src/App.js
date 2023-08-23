import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";

import blogService from "./services/blogs.js";
import Togglable from "./components/Togglable.js";
import CreateBlog from "./components/CreateBlog.js";

import BlogList from "./components/BlogList.js";
import LoginForm from "./components/LoginForm.js";
import Notification from "./components/Notification.js";
import UserInfo from "./components/UserInfo.js";
import BlogsByAuthor from "./components/BlogsByAuthor.js";
import BlogDetail from "./components/BlogDetail.js";
import Menu from "./components/Menu.js";

import { initializedBlogs, createNew } from "./reducers/blogsReducer.js";
import { setNotification } from "./reducers/notificationReducer.js";
import { setUser } from "./reducers/userReducer.js";
import userService from "./services/users.js";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, [blogs]);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      dispatch(initializedBlogs());
    });
  }, [dispatch]);

  useEffect(() => {
    const firstKey = localStorage.key(0);
    const userJson = window.localStorage.getItem(firstKey);
    const user = JSON.parse(userJson);
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Blog App</h2>
      <Notification></Notification>

      {user ? (
        <>
          <Menu user={user} users={users} blogs={blogs}></Menu>
        </>
      ) : (
        <>
          <h3>Log in to application</h3>
          <LoginForm></LoginForm>
        </>
      )}
    </div>
  );
};

export default App;
