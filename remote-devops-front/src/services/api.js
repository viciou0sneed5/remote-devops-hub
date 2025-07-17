import axios from 'axios'

export const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

export const loginWithGithub = (code) => API.post('/github/login', { code })

export default API
