<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <h2 class="h2">库存管理系统</h2>
        <Sidebar :list="routerData" />
      </el-aside>
      <el-container>
        <el-header>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ $store.state.userinfo.username }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div id="day" title="当前时间">{{ date }}</div>
        </el-header>
        <el-main>
          <div id="pageTitle" v-show="$store.state.pageTitle !== '首页'">{{ $store.state.pageTitle }}</div>
          <transition name="slide-fade">
            <!-- <keep-alive> -->
            <!-- <router-view v-if="$route.meta.keepAlive" /> -->
            <router-view />
            <!-- </keep-alive> -->
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
let timer;
import Sidebar from "@/components/sidebar/Sidebar.vue";
import moment from "moment";
export default {
  name: "Home",
  components: {
    Sidebar
  },
  data() {
    return {
      routerData: [],
      date: ""
    };
  },
  mounted() {
    this.routerData = this.$router.options.routes;
    timer = requestAnimationFrame(this.getDate);
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "logOut":
          this.logOut();
          break;
      }
    },
    getDate() {
      // this.date = new Date().toLocaleString();
      this.date = moment().format("YYYY-MM-DD HH:mm:ss")
      timer = requestAnimationFrame(this.getDate);
    },
    logOut() {
      this.$store.dispatch("setUserinfo", { name: null });
      this.$router.push("/login");
    }
  },
  destroyed() {
    cancelAnimationFrame(timer);
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  min-height: 100%;
}
.el-header {
  box-shadow: 0 1px 3px 0 #999;
}
.el-aside {
  width: 100px;
  height: 100%;
  min-height: 100vh;
  background: rgb(48, 65, 86);
  color: rgb(191, 203, 217);
  .h2 {
    text-align: center;
  }
}
.el-dropdown {
  float: right;
  line-height: 30px;
  margin: 15px 10px 0 0;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  transition: all 0.3s;
  &:hover {
    filter: brightness(1.5);
  }
}
#day {
  float: right;
  height: 100%;
  margin-right: 50px;
  line-height: 60px;
  color: #666;
}
.el-icon-arrow-down {
  font-size: 15px;
}
.el-main{
  overflow: hidden;
}
#pageTitle{
  height: 40px;
  line-height: 40px;
  padding-left: 30px;
  border-radius: 10px;
  color: #666;
  font-weight: 600;
  box-shadow: 0 2px 6px 0 #d2d2d2;
  margin-bottom: 20px;
}
</style>
