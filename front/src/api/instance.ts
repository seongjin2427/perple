import axios from 'axios';
const instance = axios.create({
  baseURL: process.env.REACT_APP_YOUTUBE_BASE_URL,
});

instance.interceptors.request.use((config) => {});

instance.interceptors.response.use((config) => {});

export default axios;
