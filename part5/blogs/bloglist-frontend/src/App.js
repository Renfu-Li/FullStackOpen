import { useState, useEffect } from "react";

import login from "./services/login";
import blogService from "./services/blogs";

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
    const userJson = window.localStorage.getItem("loggedInUser");
    const user = JSON.parse(userJson);
    if (user) {
      setUser(user);
    }
  }, []);

  const Notification = () => {
    return <p>{message}</p>;
  };

  const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsername = (event) => {
      setUsername(event.target.value);
    };

    const handlePassword = (event) => {
      setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
      event.preventDefault();
      try {
        const userInfo = await login({ username, password });
        setUser(userInfo);

        window.localStorage.setItem("loggedInUser", JSON.stringify(userInfo));

        setUsername("");
        setPassword("");
      } catch (exceptions) {
        setMessage("Wrong username or password");
        setTimeout(() => setMessage(""), 5000);
        console.log("invalid credentials");
      }
    };

    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input value={username} onChange={handleUsername}></input>
        </div>
        <div>
          password
          <input value={password} onChange={handlePassword}></input>
        </div>
        <button>login</button>
      </form>
    );
  };

  const LoggedIn = ({ blogs }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleTitle = (event) => {
      setTitle(event.target.value);
    };

    const handleAuthor = (event) => {
      setAuthor(event.target.value);
    };

    const handleUrl = (event) => {
      setUrl(event.target.value);
    };

    const handleCreateBlog = async (event) => {
      event.preventDefault();
      const blog = { title, author, url };
      const savedBlog = await blogService.create(user, blog);
      setBlogs(blogs.concat(savedBlog));
      setMessage(`Successfully created a new blog ${title} by ${author}`);
      setTimeout(() => setMessage(""), 5000);

      setTitle("");
      setAuthor("");
      setUrl("");
    };

    const handleLogout = () => {
      window.localStorage.removeItem("loggedInUser");
      setUser(null);
    };

    return (
      <>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>Logout</button>
        <h3>Create New Blog</h3>
        <form onSubmit={handleCreateBlog}>
          <div>
            title: <input value={title} onChange={handleTitle}></input>
          </div>
          <div>
            author: <input value={author} onChange={handleAuthor}></input>
          </div>
          <div>
            url: <input value={url} onChange={handleUrl}></input>
          </div>
          <button>Create</button>
          <br></br>
          {blogs.map((blog) => (
            <p key={blog.id}>
              {blog.title} by {blog.author}
            </p>
          ))}
        </form>
      </>
    );
  };

  console.log(user);

  return (
    <div>
      {user ? (
        <>
          <h2>blogs</h2>
          <Notification></Notification>
          <LoggedIn blogs={blogs}></LoggedIn>
        </>
      ) : (
        <>
          <h2>Log in to application</h2>
          <Notification></Notification>
          <LoginForm></LoginForm>
        </>
      )}
    </div>
  );
};

export default App;
