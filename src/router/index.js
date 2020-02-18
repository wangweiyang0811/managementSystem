import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import notFound from "../views/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/404",
    name: "notFound",
    component: notFound
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  from;
  if (to.name !== "Login") {
    from;
    if (!store.state.userinfo.token) {
      next("/login");
      return;
    }
  }
  next();
});

export default router;
