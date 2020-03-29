import Home from "@/views/Home.vue";
const userRouter = [{
    path: "/user",
    component: Home,
    redirect: "noRedirect",
    name: "User",
    meta: {
      title: "用户管理",
      icon: "el-icon-menu"
    },
    children: [{
      path: "/userinfo",
      component: () => import("@/views/user/UserInfo.vue"),
      name: "Userinfo",
      meta: {
        title: "用户信息",
        icon: "el-icon-menu",
        keepAlive: true
      }
    }]
  },
  {
    path: "/user1",
    component: Home,
    redirect: "noRedirect",
    name: "User1",
    meta: {
      title: "用户管理",
      icon: "el-icon-menu"
    },
    children: [{
      path: "/loginInformation",
      component: () => import("@/views/user/LoginInformation.vue"),
      name: "LoginInformation",
      meta: {
        title: "登录信息",
        icon: "el-icon-menu",
        keepAlive: true
      }
    }]
  }
];
export default userRouter;