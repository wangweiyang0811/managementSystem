import Vue from "vue";
import Vuex from "vuex";
import { session } from "../tool/Storage.js";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    userinfo: {
      name: null,
      token: null
    }
  },
  mutations: {
    setUserinfo(state, val) {
      state.userinfo = val;
      session.set("userinfo", val);
    }
  },
  actions: {
    setUserinfo(context, val) {
      context.commit("setUserinfo", val);
    }
  },
  modules: {}
});

let userinfo = session.get("userinfo");
if (userinfo) {
  store.dispatch("setUserinfo", userinfo);
}

export default store;
