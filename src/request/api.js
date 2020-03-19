import axios from "axios";
import store from "../store/index";

axios.defaults.timeout = 10000;
// axios.defaults.headers.common["authorization"] = store.state.token;
// console.log(store.state.token)

axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.authorization = "Bearer " + store.state.token;
    }
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
// userinfo
export function login(data) {
  return axios.post("/api/user/login", data);
}
export function sigin(data) {
  return axios.post("/api/user", data);
}
export function deleteUser(data) {
  return axios.delete("/api/user", {
    params: data
  });
}
export function getUser(data) {
  return axios.get("/api/user", {
    params: data
  });
}
export function getAllUser() {
  return axios.get("/api/user/all");
}
export function setUserUse(data) {
  return axios.put("/api/user", data);
}
// logininfo
export function setLoginInfo(data) {
  return axios.post("/api/loginInfo", data);
}
export function getLoginInfo(data) {
  return axios.get("/api/loginInfo", {
    params: data
  });
}
// warehouseinfo
export function creatHouse(data) {
  return axios.post("/api/house", data);
}
export function deleteHouse(data) {
  return axios.delete("/api/house", {
    params: data
  });
}
export function getHouse(data) {
  return axios.get("/api/house", {
    params: data
  });
}

// supplierinfo
export function creatSupplier(data) {
  return axios.post("/api/supplier", data);
}
export function deleteSupplier(data) {
  return axios.delete("/api/supplier", {
    params: data
  });
}
export function updateSupplier(data) {
  return axios.put("/api/supplier", data);
}
export function getSupplier(data) {
  return axios.get("/api/supplier", {
    params: data
  });
}

// input
export function creatInput(data) {
  return axios.post("/api/input", data);
}
export function deleteInput(data) {
  return axios.delete("/api/input", {
    params: data
  });
}
export function getInput(data) {
  return axios.get("/api/input", {
    params: data
  });
}

// output
export function creatOutput(data) {
  return axios.post("/api/output", data);
}
export function deleteOutput(data) {
  return axios.delete("/api/output", {
    params: data
  });
}
export function getOutput(data) {
  return axios.get("/api/output", {
    params: data
  });
}