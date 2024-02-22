/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

export default {
  films: {
    fetchAll: () => axios.get('/api/authfilms').then((response) => response.data.films),
    fetchById: (id) => axios.get(`/api/authfilms/${id}`).then((response) => response.data.films),
    create: (film) => axios.post('/api/authfilms', { film }).then((response) => response.data.film),
    update: (film) =>
      axios.put(`api/authfilms/${film._id}`, { film }).then((response) => response.data.film),
    delete: (film) => axios.delete(`/api/authfilms/${film._id}`, { film }),
  },

  users: {
    create: (user) => axios.post('/api/users', { user }),
    login: (credentials) =>
      axios.post('/api/auth', { credentials }).then((response) => response.data.token),
  },
};
