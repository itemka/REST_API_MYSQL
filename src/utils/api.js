import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.ROOT_URL,
  headers: {
    'Content-Type': 'aplication/json',
    Accept: 'aplication/json',
  },
});

export const API = {
  getTasks: () => apiClient.get('/'),
  postTasks: (body) => apiClient.post('/', { body }),
  putTasks: (id, body) => apiClient.put(`/${id}`, { body }),
  deleteTasks: (id) => apiClient.delete(`/${id}`),
};
