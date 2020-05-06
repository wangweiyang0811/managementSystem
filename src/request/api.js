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
export function loginStep(data) {
  return axios.get("/api/loginInfo/login", {
    params: data
  });
}
export function getLoginByUsername(data) {
  return axios.get("/api/loginInfo/name", {
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
export function getHouseByName(data) {
  return axios.get("/api/house/name", {
    params: data
  });
}
export function getAllHouse() {
  return axios.get("/api/house/all");
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
export function getSupplierByName(data) {
  return axios.get("/api/supplier/name", {
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

export function getAllSupplier() {
  return axios.get("/api/supplier/all");
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
export function getInputByTime(data) {
  return axios.get("/api/input/time", {
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
export function getOutputByTime(data) {
  return axios.get("/api/output/time", {
    params: data
  });
}
// stock
export function creatStock(data) {
  return axios.post("/api/stock", data);
}
export function zhStock(data) {
  return axios.post("/api/stock/zh", data);
}
export function deleteStock(data) {
  return axios.delete("/api/stock", {
    params: data
  });
}
export function searchStock(data) {
  return axios.get("/api/stock/type", {
    params: data
  });
}
export function getStock(data) {
  return axios.get("/api/stock", {
    params: data
  });
}

export function stockNum(data) {
  return axios.get("/api/stock/num", {
    params: data
  });
}

export function inputSevenDay(data) {
  return axios.get("/api/input/seven", {
    params: data
  });
}
export async function outputSevenDay(data) {
  return axios.get("/api/output/seven", {
    params: data
  });
}
