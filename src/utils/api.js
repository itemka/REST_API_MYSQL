import axios from 'axios';
import qs from 'qs';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_ROOT_URL,
  headers: {
    'Content-Type': 'aplication/json',
    Accept: 'aplication/json',
  },
});

const pathToAPI = '/api/todo';
const additionHeaders = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };

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
};
