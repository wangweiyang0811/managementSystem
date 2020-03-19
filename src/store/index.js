import Vue from "vue";
import Vuex from "vuex";
import { session } from "../tool/Storage.js";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    userinfo: {
      username: null,
      permissions: null
    },
    token: undefined,
    pageTitle: ""
  },
  mutations: {
    setUserinfo(state, val) {
      state.userinfo = val;
      session.set("userinfo", val);
    },
    setToken(state, val) {
      state.token = val;
      session.set("token", val);
    },
    setPageTitle(state, val) {
      state.pageTitle = val;
      session.set("pageTitle", val);
    }
  },
  actions: {
    setUserinfo(context, val) {
      context.commit("setUserinfo", val);
    },
    setToken(context, val) {
      context.commit("setToken", val);
    },
    setPageTitle(context, val) {
      context.commit("setPageTitle", val);
    }
  },
  modules: {}
});

let userinfo = session.get("userinfo");
let token = session.get("token");
if (userinfo && token) {
  store.dispatch("setUserinfo", userinfo);
  store.dispatch("setToken", token);
}

export default store;
