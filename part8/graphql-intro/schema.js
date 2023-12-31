const typeDefs = `
  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Address {
    street: String!
    city: String!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation{
    createUser(
      username: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    addAsFriend(
      name: String!
    ): User

    editNumber(
      name: String!
      phone: String!
    ): Person


  }

  enum YesNo {
    YES
    NO
  }

  type Subscription {
    personAdded: Person!
  }
`;

module.exports = typeDefs;
