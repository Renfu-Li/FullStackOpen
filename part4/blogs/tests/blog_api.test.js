const Blog = require("../models/blog");
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { initialUsers, initialBlogs, blogsInDb } = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  for (let i = 0; i < initialUsers.length; i++) {
    const { username, name, password } = initialUsers[i];
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    let userObject = new User({
      username,
      name,
      passwordHash,
    });
    await userObject.save();

    const user = await User.findOne({ username });
    const { title, author, url, likes } = initialBlogs[i];
    const newBlog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id,
    });

    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog);
    await user.save();
  }
});

test("all notes are returned", async () => {
  const response = await api.get("/api/blogs");
  console.log(response.body);
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("unique identifier property of blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  response.body.map((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test("save a new blog to database", async () => {
  const { username, password } = initialUsers[0];

  const loginResponse = await api
    .post("/api/login")
    .send({ username, password });
  const token = loginResponse.body.token;

  const blogContent = {
    title: "test saving new blog",
    author: "Mac user",
    url: "https://example.com/",
    likes: 20,
  };

  const saveResponse = await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(blogContent)
    .expect(201);

  console.log(saveResponse.body.error);
  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
  expect(blogsAtEnd[blogsAtEnd.length - 1].title).toEqual(blogContent.title);
});

test("missing token returns a status code 401", async () => {
  const blogContent = {
    title: "test saving new blog",
    author: "Mac user",
    url: "https://example.com/",
    likes: 20,
  };

  await api.post("/api/blogs").send(blogContent).expect(401);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
});

test("likes property has a default value of 0", async () => {
  const { username, password } = initialUsers[0];

  const response = await api.post("/api/login").send({ username, password });
  const token = response.body.token;

  const blogContent = {
    title: "test saving new blog",
    author: "Mac user",
    url: "https://example.com/",
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(blogContent)
    .expect(201);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

  const lastBlog = blogsAtEnd[blogsAtEnd.length - 1];
  expect(lastBlog.likes).toBe(0);
});

// test("missing title or url results a status code 400", async () => {
//   const { username, password } = initialUsers[0];

//   const response = await api.post("/api/login").send({ username, password });
//   const token = response.body.token;

//   const blogContent = {
//     title: "test missing url",
//     author: "Mac user",
//     likes: 20,
//   };

//   await api
//     .post("/api/blogs")
//     .set("Authorization", `bearer ${token}`)
//     .send(blogContent)
//     .expect(400);

//   await api.post("/api/blogs").send(blogContent).expect(400);
// });

test("updating a note", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const blogContent = {
    title: "test missing url",
    author: "Mac user",
    url: "www.apple.com",
    likes: 20,
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogContent).expect(200);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd[0].title).toBe(blogContent.title);
});

test("deletion of a note", async () => {
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];
  await api.delete(`/api/blogs/${blogToDelete.id}`);
  const blogsArEnd = await blogsInDb();

  expect(blogsArEnd.length).toBe(blogsAtStart.length - 1);
});

afterAll(async () => {
  await mongoose.connection.close();
});
