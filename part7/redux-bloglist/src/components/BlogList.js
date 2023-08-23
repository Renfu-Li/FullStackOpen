import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog.js";
// import blogService from "../services/blogs.js";

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  return sortedBlogs.map((blog) => (
    <Blog
      key={blog.id}
      user={user}
      blog={blog}

      // blogService={blogService}
    ></Blog>
  ));
};

export default BlogList;
