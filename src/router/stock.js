import Home from "@/views/Home.vue";
const stockRouter = [
  
  {
    path: "/stock2",
    component: Home,
    redirect: "noRedirect",
    name: "Input2",
    meta: {
      title: "库存管理",
      icon: "el-icon-menu"
    },
    children: [{
      path: "/stock",
      component: () => import("@/views/stock/Stock.vue"),
      name: "Stock",
      meta: {
        title: "库存信息",
        icon: "el-icon-menu",
        keepAlive: true
      }
    }]
  },{
    path: "/stock0",
    component: Home,
    redirect: "noRedirect",
    name: "Input0",
    meta: {
      title: "库存管理",
      icon: "el-icon-menu"
    },
    children: [{
      path: "/input",
      component: () => import("@/views/stock/InputSignals.vue"),
      name: "InputSignals",
      meta: {
        title: "入库信息",
        icon: "el-icon-menu",
        keepAlive: true
      }
    }]
  },
  {
    path: "/stock1",
    component: Home,
    redirect: "noRedirect",
    name: "Input1",
    meta: {
      title: "库存管理",
      icon: "el-icon-menu"
    },
    children: [{
      path: "/output",
      component: () => import("@/views/stock/OutputSignals.vue"),
      name: "OutputSignals",
      meta: {
        title: "出库信息",
        icon: "el-icon-menu",
        keepAlive: true
      }
    }]
  }

];
export default stockRouter;