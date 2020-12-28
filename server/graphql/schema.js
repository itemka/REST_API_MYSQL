const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Todo {
    id: ID!
    done: Boolean!
    title: String!
    createdAt: String
    updatedAt: String
  }

  input TodoInput {
    title: String!
  }

  type Query {
    getTodos: [Todo!]!
  }

  type Mutation {
    createTasks(todo: TodoInput!): Todo!
    updateTasks(id: ID!, done: Boolean!): Todo!
    deleteTasks(id: ID!): Todo!
  }
`);