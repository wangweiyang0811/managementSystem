import Home from "@/views/Home.vue";
const stockRouter = {
  path: "/stock",
  component: Home,
  redirect: "noRedirect",
  name: "Input",
  meta: {
    title: "库存管理",
    icon: "el-icon-menu"
  },
  children: [
    {
      path: "/input",
      component: () => import("@/views/stock/InputSignals.vue"),
      name: "InputSignals",
      meta: {
        title: "入库信息",
        icon: "",
        keepAlive: true
      }
    },
    {
      path: "/output",
      component: () => import("@/views/stock/OutputSignals.vue"),
      name: "OutputSignals",
      meta: {
        title: "出库信息",
        icon: "",
        keepAlive: true
      }
    },
    {
      path: "/stock",
      component: () => import("@/views/stock/Stock.vue"),
      name: "Stock",
      meta: {
        title: "库存信息",
        icon: "",
        keepAlive: true
      }
    }
  ]
};
export default stockRouter;
