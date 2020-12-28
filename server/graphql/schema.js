const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Todo {
    id: ID!
    done: Boolean!
    title: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getTodos: [Todo!]!
  }
`);