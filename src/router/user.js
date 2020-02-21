import Home from "@/views/Home.vue";
const userRouter = {
  path: "/user",
  component: Home,
  redirect: "noRedirect",
  name: "User",
  meta: {
    title: "用户管理",
    icon: "el-icon-menu"
  },
  children: [
    {
      path: "/userinfo",
      component: () => import("@/views/user/UserInfo.vue"),
      name: "Userinfo",
      meta: {
        title: "用户信息",
        icon: "",
        keepAlive: true
      }
    },
    {
      path: "/loginInformation",
      component: () => import("@/views/user/LoginInformation.vue"),
      name: "LoginInformation",
      meta: {
        title: "登录信息",
        icon: "",
        keepAlive: true
      }
    }
  ]
};
export default userRouter;
