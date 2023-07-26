const { mostLikes } = require("../utils/list_helper");

const listHelper = require("../utils/list_helper").dummy;
const totalLikes = require("../utils/list_helper").totalLikes;
const favoriteBlog = require("../utils/list_helper").favoriteBlog;
const mostBlogs = require("../utils/list_helper").mostBlogs;

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns one", () => {
  expect(listHelper([])).toBe(1);
});

describe("total likes", () => {
  test("list with only 1 blog equals the likes of that", () => {
    console.log(blogs.slice(0, 1), blogs[0].likes);
    expect(totalLikes(blogs.slice(0, 1))).toBe(blogs[0].likes);
  });
});

describe("favoriate blog", () => {
  test("favoriteBlog returns the blog with the most likes", () => {
    console.log(favoriteBlog(blogs));
    expect(favoriteBlog(blogs)).toEqual(blogs[2]);
  });
});

describe("author with the most blogs", () => {
  test("mostBlogs returns the author with the most blogs and the blogs count", () => {
    expect(mostBlogs(blogs)).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });
});

describe("author with the most likes", () => {
  test("mostLikes return the author with the most likes and the likes count", () => {
    expect(mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
