const { info } = require("../utils/logger");
const Blog = require("../models/blog");
const blogsRouter = require("express").Router();

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.status(200).json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  res.status(200).json(blog);
});

blogsRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;

  const user = req.user;

  const newBlog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user._id,
  });

  const savedBlog = await newBlog.save();
  info(savedBlog);

  user.blogs = user.blogs.concat(savedBlog);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes } = req.body;

  const user = req.user;

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes, user: user._id },
    { new: true }
  );

  res.status(200).json(updatedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const blogId = req.params.id;
  const blogToDelete = await Blog.findById(blogId);
  const blogAuthorId = blogToDelete.user.toJSON();
  const loggedinAuthorId = req.user._id.toJSON();

  if (blogToDelete && blogAuthorId === loggedinAuthorId) {
    await Blog.findByIdAndDelete(blogId);
    res.status(200).json(blogToDelete);
  }
});

module.exports = blogsRouter;
