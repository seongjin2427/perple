import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Authorization");
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.withCredentials = true;
    }

    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(async (config) => {
  if (config.data["accessToken"]) {
    localStorage.setItem("Authorization", config.data["accessToken"]);
  }

  if (config.data.errorMessage === "login needed") {
    alert("토큰이 만료되었습니다.\n로그인이 필요합니다");
    window.location.reload();
  }

  return config;
});

export default instance;
