import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNew } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";

import PropTypes from "prop-types";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
    const newBlog = { title, author, url };
    createBlog(newBlog);

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const createBlog = async (newBlog) => {
    dispatch(createNew(user, newBlog));

    dispatch(
      setNotification(
        `Successfully created a new blog ${newBlog.title} by ${newBlog.author}`
      )
    );

    setTimeout(() => dispatch(setNotification("")), 5000);
  };

  return (
    <>
      <h3>Create New Blog</h3>
      <form onSubmit={handleCreateBlog}>
        <div>
          title: <input id="title" value={title} onChange={handleTitle}></input>
        </div>
        <div>
          author:{" "}
          <input id="author" value={author} onChange={handleAuthor}></input>
        </div>
        <div>
          url: <input id="url" value={url} onChange={handleUrl}></input>
        </div>
        <button id="createButton">Create</button>
        <br></br>
      </form>
    </>
  );
};

export default CreateBlog;
