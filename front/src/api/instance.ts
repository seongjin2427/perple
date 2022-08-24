import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// instance.defaults.withCredentials = true;

instance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers['Content-Type'] = 'application/json; charset=utf-8;';
    }
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  },
);

instance.interceptors.response.use((config) => {
  config.config.withCredentials = true;
  if (config.config.headers) {
    config.config.headers['Access-Control-Allow-Credentials'] = true;
  }
  return config;
});

export default instance;
