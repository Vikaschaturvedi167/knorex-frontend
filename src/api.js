import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backend-x0qe.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
