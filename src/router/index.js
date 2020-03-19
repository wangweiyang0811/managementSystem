import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/404.vue";
import StockRouter from "./stock.js";
import UserRouter from "./user.js";
import Warehouse from "@/views/warehouse/Warehouse.vue";
import Supplier from "@/views/supplier/Supplier.vue";

Vue.use(VueRouter);
// 个性化配置进度条外观
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 200, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.1 // 初始化时的最小百分比
});

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
    hidden: false,
    meta: {
      title: "首页",
      icon: "el-icon-menu"
    }
  },
  StockRouter,
  UserRouter,
  {
    path: "/ware",
    component: Home,
    children: [{
      path: "/warehouse",
      component: Warehouse,
      name: "Warehouse",
      hidden: false,
      meta: {
        title: "仓库管理",
        icon: "el-icon-menu",
        keepAlive: true
      }
    }]
  },
  {
    path: "/sup",
    component: Home,
    children: [{
      path: "/supplier",
      name: "Supplier",
      component: Supplier,
      hidden: false,
      meta: {
        title: "供应商管理",
        icon: "el-icon-menu",
        keepAlive: true
      }
    }]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    hidden: true,
    meta: {
      title: "登录"
    }
  },
  {
    path: "/404",
    name: "NotFound",
    hidden: true,
    component: NotFound,
    meta: {
      title: 404
    }
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
    meta: {
      title: 404
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (hasOwnProperty.call(to, "meta") && to.meta.title) {
    store.dispatch("setPageTitle", to.meta.title);
  }
  if (to.name !== "Login") {
    if (!store.state.userinfo.username) {
      next("/login");
      NProgress.done();
      return;
    }
  }
  next();
  NProgress.done();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;