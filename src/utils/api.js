import axios from 'axios';
import qs from 'qs';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_ROOT_URL,
  headers: {
    'Content-Type': 'aplication/json',
    Accept: 'aplication/json',
  },
});

const pathToAPI = '/graphql';
const additionHeaders = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

export const API = {
  getTasks: (query) => apiClient.post(
    pathToAPI,
    qs.stringify({ query }),
    additionHeaders
  ),
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
  
  // const pathToAPI = '/api/todo'; // using the usual rest api
  // getTasks: () => apiClient.get(pathToAPI),
};
