import axios from 'axios';

const api = axios.create({ 
  baseURL: 'https://instabackend-pitter.herokuapp.com/'
})

export default api;