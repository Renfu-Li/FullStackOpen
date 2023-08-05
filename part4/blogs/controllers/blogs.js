const jwt = require("jsonwebtoken");
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

  if (!req.token) {
    return res.status(401).json({ error: "token not provided" });
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken) {
    return res.status(401).json({ error: "token invalid" });
  }

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
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes },
    { new: true }
  );
  res.status(200).json(updatedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const blogToDelete = Blog.findById(req.params.id);
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  const blogAuthorId = blogToDelete.user.toString();
  if (blogToDelete && decodedToken && blogAuthorId === decodedToken.id) {
    Blog.findByIdAndDelete(blogToDelete.id);
  }

  await Blog.deleteOne({ _id: req.params.id });
  res.status(204).end();
});

module.exports = blogsRouter;
