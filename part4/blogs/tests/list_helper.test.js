const { initialBlogs } = require("./test_helper.js");
const mostLikes = require("../utils/list_helper").mostLikes;
const dummy = require("../utils/list_helper").dummy;
const totalLikes = require("../utils/list_helper").totalLikes;
const favoriteBlog = require("../utils/list_helper").favoriteBlog;
const mostBlogs = require("../utils/list_helper").mostBlogs;

test("dummy returns one", () => {
  expect(dummy([])).toBe(1);
});

describe("total likes", () => {
  test("list with only 1 blog equals the likes of that", () => {
    expect(totalLikes(initialBlogs.slice(0, 1))).toBe(initialBlogs[0].likes);
  });
});

describe("favoriate blog", () => {
  test("favoriteBlog returns the blog with the most likes", () => {
    console.log(favoriteBlog(initialBlogs));
    expect(favoriteBlog(initialBlogs)).toEqual(initialBlogs[0]);
  });
});

describe("author with the most blogs", () => {
  test("mostBlogs returns the author with the most blogs and the blogs count", () => {
    expect(mostBlogs(initialBlogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("author with the most likes", () => {
  test("mostLikes return the author with the most likes and the likes count", () => {
    expect(mostLikes(initialBlogs)).toEqual({
      author: "supporter of Ukraine",
      likes: 100,
    });
  });
});
