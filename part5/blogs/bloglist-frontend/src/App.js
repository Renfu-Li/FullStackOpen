import { useState, useEffect } from "react";

import blogService from "./services/blogs.js";
import Togglable from "./components/Togglable.js";
import CreateBlog from "./components/CreateBlog.js";

import BlogList from "./components/BlogList.js";
import LoginForm from "./components/LoginForm.js";
import Notification from "./components/Notification.js";
import Logout from "./components/Logout.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const firstKey = localStorage.key(0);
    const userJson = window.localStorage.getItem(firstKey);
    const user = JSON.parse(userJson);
    if (user) {
      setUser(user);
    }
  }, []);

  const createBlog = async (newBlog) => {
    const savedBlog = await blogService.create(user, newBlog);
    setBlogs(blogs.concat(savedBlog));
    setMessage(
      `Successfully created a new blog ${newBlog.title} by ${newBlog.author}`
    );
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <div>
      {user ? (
        <>
          <h2>blogs</h2>
          <Notification message={message}></Notification>
          <Logout
            user={user}
            setUser={setUser}
            setMessage={setMessage}
          ></Logout>
          <Togglable>
            <CreateBlog createBlog={createBlog}></CreateBlog>
          </Togglable>

          <BlogList user={user} blogs={blogs} setBlogs={setBlogs}></BlogList>
        </>
      ) : (
        <>
          <h2>Log in to application</h2>
          <Notification message={message}></Notification>
          <LoginForm setUser={setUser} setMessage={setMessage}></LoginForm>
        </>
      )}
    </div>
  );
};

export default App;
