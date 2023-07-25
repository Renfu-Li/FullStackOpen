const { info, error } = require("../utils/logger");
const Blog = require("../models/blog");
const blogsRouter = require("express").Router();

blogsRouter.get("/", (req, res, next) => {
  Blog.find({})
    .then((blogs) => {
      res.status(200).json(blogs);
    })
    .catch((err) => next(err));
});

blogsRouter.post("/", (req, res, next) => {
  const { title, author, url, likes } = req.body;
  const newBlog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  });

  newBlog
    .save()
    .then((savedBlog) => {
      info(savedBlog);
      res.status(201).json(savedBlog);
    })
    .catch((err) => next(err));
});

module.exports = blogsRouter;
