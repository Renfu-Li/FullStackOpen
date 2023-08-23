import { useMatch, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import BlogDetail from "./BlogDetail";

const BlogsByAuthor = ({ user }) => {
  if (!user) return null;
  return (
    <div>
      <h3>{user.username}</h3>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogsByAuthor;
