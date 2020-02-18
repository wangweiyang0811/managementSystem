import axios from "axios";

axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.error(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);
export function getToken() {
  return axios.get("/api/index");
}
