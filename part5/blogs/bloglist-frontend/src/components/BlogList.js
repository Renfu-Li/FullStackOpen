import Blog from "./Blog.js";
// import blogService from "../services/blogs.js";

const BlogList = ({ user, blogs, setBlogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  return sortedBlogs.map((blog) => (
    <Blog
      key={blog.id}
      user={user}
      blog={blog}
      blogs={blogs}
      setBlogs={setBlogs}
      // blogService={blogService}
    ></Blog>
  ));
};

export default BlogList;
