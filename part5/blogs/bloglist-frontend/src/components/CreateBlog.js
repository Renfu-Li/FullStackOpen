import { useState } from "react";
import PropTypes from "prop-types";

const CreateBlog = ({ createBlog }) => {
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
    const newBlog = { title, author, url };
    createBlog(newBlog);

    setTitle("");
    setAuthor("");
    setUrl("");
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

CreateBlog.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default CreateBlog;
