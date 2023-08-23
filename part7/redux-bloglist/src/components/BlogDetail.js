import { useDispatch, useSelector } from "react-redux";
import { updateBlog, commentBlog } from "../reducers/blogsReducer";
import { useState } from "react";

const BlogDetail = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const increaseLikes = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };

    dispatch(updateBlog(user, newBlog));
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleComment = async (e) => {
    e.preventDefault();

    dispatch(commentBlog(user, blog.id, comment));
    setComment("");
  };

  if (!blog) return null;

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>{blog.url}</p>
      <div>
        {blog.likes} likes<button onClick={increaseLikes}>Like</button>
      </div>
      <p>added by {blog.author}</p>

      <h5>Comments</h5>
      <div>
        <input type="text" value={comment} onChange={handleChange}></input>
        <button onClick={handleComment}>Add a comment</button>
      </div>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogDetail;
