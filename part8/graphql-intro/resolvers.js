const { PubSub } = require("graphql-subscriptions");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Person = require("./models/user");
const User = require("./models/user");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    personCount: async () => await Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) return Person.find({});
      return Person.find({ phone: { $exists: args.phone === "YES" } });
    },
    findPerson: async (root, args) => Person.find({ name: args.name }),
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },

  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      try {
        const createdUser = await user.save();
        // console.log(createdUser); // the only log
        return createdUser;
      } catch (error) {
        throw new GraphQLError("Saving person failed", {
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

    addPerson: async (root, args, context) => {
      const person = new Person({ ...args });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: BAD_USER_INPUT,
          },
        });
      }

      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new GraphQLError("Saving person failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }

      pubsub.publish("PERSON_ADDED", { personAdded: person });
      return person;
    },

    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });

      person.phone = args.phone;
      try {
        await person.save();
      } catch (error) {
        throw new GraphQLError("Saving number failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.phone,
            error,
          },
        });
      }

      return person;
    },

    addAsFriend: async (root, args, { currentUser }) => {
      const isFriend = (person) =>
        currentUser.friends.some(
          (f) => f._id.toString() === person._id.toString()
        );

      console.log(currentUser.friends);

      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const person = await Person.findOne({ name: args.name });
      console.log(person);
      if (!isFriend(person)) {
        console.log("not an existing friend");
        currentUser.friends = currentUser.friends.concat(person);
      }

      console.log(isFriend(person));

      await currentUser.save();
      console.log(currentUser.friends);
      return currentUser;
    },
  },

  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator("PERSON_ADDED"),
    },
  },
};

module.exports = resolvers;
