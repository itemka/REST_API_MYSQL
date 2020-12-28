import axios from 'axios';
import qs from 'qs';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_ROOT_URL,
  headers: {
    'Content-Type': 'aplication/json',
    Accept: 'aplication/json',
  },
});

const pathToAPI = '/graphql'; // using the usual rest api - '/api/todo'
const additionHeaders = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
const graphqlPostRequest = (query) => apiClient.post(
  pathToAPI,
  qs.stringify({ query }),
  additionHeaders
);

export const GRAPHQL_QUERY = {
  getTasks: () => `
    query {
      getTodos {
        id
        title
        done
        createdAt
        updatedAt
      }
    }
  `,
  createTasks: (title) => `
    mutation {
      createTasks(todo: { title: "${title}" }) {
        id
        title
        done
        createdAt
        updatedAt
      }
    }
  `,
  updateTasks: (id, done) => `
    mutation {
      updateTasks(id: ${id}, done: ${done}) {
        updatedAt
      }
    }
  `,
  deleteTasks: (id) => `
    mutation {
      deleteTasks(id: ${id}) {
        id
      }
    }
  `
}


export const API = {
  getTasks: () => apiClient.get(pathToAPI),
  createTasks: (body) => apiClient.post(
    pathToAPI,
    qs.stringify({ ...body }),
    additionHeaders
  ),
  updateTasks: (id, body) => apiClient.put(
    `${pathToAPI}/${id}`,
    qs.stringify({ ...body }),
    additionHeaders
  ),
  deleteTasks: (id) => apiClient.delete(`${pathToAPI}/${id}`),
  getTasksGraphQL: () => graphqlPostRequest(GRAPHQL_QUERY.getTasks()),
  createTasksGraphQL: (title) => graphqlPostRequest(GRAPHQL_QUERY.createTasks(title)),
  updateTasksGraphQL: (id, done) => graphqlPostRequest(GRAPHQL_QUERY.updateTasks(id, done)),
  deleteTasksGraphQL: (id) => graphqlPostRequest(GRAPHQL_QUERY.deleteTasks(id))
};