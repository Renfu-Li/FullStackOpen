import { useState } from "react";
import blogService from "../services/blogs.js";

const Blog = ({ user, blog, blogs, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleVisibility = () => {
    setShowDetails(!showDetails);
  };

  const increaseLikes = async () => {
    const newBlog = { ...blog, likes: likes + 1 };
    setLikes(likes + 1);

    await blogService.update(user, newBlog);

    const updatedBlogs = blogs.map((b) => (b.id === blog.id ? newBlog : b));
    setBlogs(updatedBlogs);
  };

  const removeBlog = async () => {
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    );
    if (confirmDelete) {
      await blogService.deleteBlog(user, blog.id);
      const updatedBlogs = blogs.filter((b) => b.id !== blog.id);
      setBlogs(updatedBlogs);
    }
  };

  return (
    <div key={blog.id}>
      <hr></hr>
      <span className="title">{blog.title}</span>
      <strong> by </strong>
      <span className="author">{blog.author}</span>
      <button className="detailButton" onClick={toggleVisibility}>
        {showDetails ? "Hide" : "Show"}
      </button>
      {blog.user &&
        (blog.user.username === user.username ? (
          <button className="deleteButton" onClick={removeBlog}>
            Remove
          </button>
        ) : null)}
      {showDetails && (
        <>
          <p className="url">{blog.url}</p>
          <span className="likes">{likes}</span>
          <button className="likeButton" onClick={increaseLikes}>
            Like
          </button>
          <p>{blog.author}</p>
        </>
      )}
    </div>
  );
};

export default Blog;
