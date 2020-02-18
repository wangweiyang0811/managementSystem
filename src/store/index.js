import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userinfo: {
      name: null,
      token: null
    }
  },
  mutations: {
    setUserinfo(state, val) {
      state.userinfo = val;
    }
  },
  actions: {
    setUserinfo(context, val) {
      context.commit("setUserinfo", val);
    }
  },
  modules: {}
});
