import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateBlog, deleteBlog } from "../reducers/blogsReducer.js";

const Blog = ({ user, blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  // const [likes, setLikes] = useState(blog.likes);
  const dispatch = useDispatch();

  const toggleVisibility = () => {
    setShowDetails(!showDetails);
  };

  const increaseLikes = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };

    dispatch(updateBlog(user, newBlog));
  };

  const removeBlog = async () => {
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    );
    if (confirmDelete) {
      dispatch(deleteBlog(user, blog.id));
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
          <span className="likes">{blog.likes}</span>
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
