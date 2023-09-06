require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const typeDefs = require("./typeDefs");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to MongoDB");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    findBook: async (root, args) =>
      await Book.findOne({ title: args.title }).populate("author"),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");
      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.author.name === args.author && book.genres.includes(args.genre)
        );
      } else if (args.author) {
        return books.filter((book) => book.author.name === args.author);
      } else if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      } else {
        return books;
      }
    },

    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate("author");

      return books.filter((book) => book.author.name === root.name).length;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const knownAuthor = await Author.findOne({ name: args.author });
      let authorToSave;

      if (!knownAuthor) {
        authorToSave = new Author({ name: args.author });

        try {
          await authorToSave.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      } else {
        authorToSave = knownAuthor;
      }

      const newBook = new Book({ ...args, author: authorToSave });

      try {
        await newBook.save();
      } catch (error) {
        throw new GraphQLError("Saving new book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      return newBook;
    },

    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      if (args.name !== context.currentUser.username) {
        throw new GraphQLError("not authorized to change the birth year", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Updating user born year failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.setBornTo,
            error,
          },
        });
      }

      return author;
    },

    createUser: async (root, args) => {
      const newUser = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        return await newUser.save();
      } catch (error) {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password != "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    // console.log(auth);
    if (auth && auth.startsWith("Bearer")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );

      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
