import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  },
);

instance.interceptors.response.use((config) => {
  return config;
});

export default instance;
