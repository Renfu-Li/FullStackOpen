const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const likesList = blogs.map((blog) => blog.likes);
  const highestLike = Math.max(...likesList);

  console.log(blogs.find((blog) => blog.likes === highestLike));
  return blogs.find((blog) => blog.likes === highestLike);
};

const mostBlogs = (blogs) => {
  const authorOccurances = _.countBy(blogs, "author");

  // use lodash utility methods
  // const mostBlogsAuthor = _.maxBy(
  //   _.keys(authorOccurances),
  //   (author) => authorOccurances[author]
  // );
  // const largestBlogsCount = authorOccurances[mostBlogsAuthor];

  // use native JavsScript methods:
  const blogsCount = Object.values(authorOccurances);
  const largestBlogsCount = Math.max(...blogsCount);
  const mostBlogsAuthor = Object.keys(authorOccurances).find(
    (author) => authorOccurances[author] === largestBlogsCount
  );

  return { author: mostBlogsAuthor, blogs: largestBlogsCount };
};

const mostLikes = (blogs) => {
  const groupedLikes = _.groupBy(blogs, "author");
  // const authors = Object.keys(groupedLikes);
  // const likesByAuthor = authors.map((author) => {
  //   return { [author]: _.sumBy(groupedLikes[author], "likes") };
  // });

  // const mostLikesInfo = _.maxBy(
  //   likesByAuthor,
  //   (blog) => Object.values(blog)[0]
  // );

  // use for loop
  const likesByAuthor = {};
  for (const author in groupedLikes) {
    likesByAuthor[author] = _.sumBy(groupedLikes[author], "likes");
  }

  const authors = _.keys(likesByAuthor);
  const mostLikesAuthor = _.maxBy(authors, (author) => likesByAuthor[author]);
  const mostLikes = likesByAuthor[mostLikesAuthor];

  console.log({ author: mostLikesAuthor, likes: mostLikes });
  return { author: mostLikesAuthor, likes: mostLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
