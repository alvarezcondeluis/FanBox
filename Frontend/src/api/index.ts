// src/api/index.js
import axios from 'axios';

const api = axios.create({
  baseURL:  'http://localhost:1234/api', 
});

export default api;
