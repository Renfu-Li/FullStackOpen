const Blog = require("../models/blog");

const initialUsers = [
  {
    username: "Dead Trump",
    name: "Truly Dead Trump",
    password: "Dumb Trump",
  },
  {
    username: "Dead Putin",
    name: "Truly Dead Putin",
    password: "Murder Putin",
  },
  {
    username: "Hero Zelensky",
    name: "Truly Hero Zelensky",
    password: "Saver Zelensky",
  },
];

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "Glory to Ukraine",
    author: "supporter of Ukraine",
    url: "https://reactpatterns.com/",
    likes: 100,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Nazi Russia will be defeated",
    author: "Peace lover",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 100,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Dumb Trump won't be president again",
    author: "Democracy lover",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialUsers, initialBlogs, blogsInDb };
