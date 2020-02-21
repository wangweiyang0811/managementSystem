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
              {{ $store.state.userinfo.name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <transition name="slide-fade">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive" />
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getToken } from "@/request/api.js";
import Sidebar from "@/components/sidebar/Sidebar.vue";
export default {
  name: "Home",
  components: {
    Sidebar
  },
  data() {
    return {
      routerData: []
    };
  },
  created() {
    getToken().then(res => {
      console.log(res);
    });
  },
  mounted() {
    this.routerData = this.$router.options.routes;
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "logOut":
          this.logOut();
          break;
      }
    },
    logOut() {
      this.$store.dispatch("setUserinfo", { token: null, name: null });
      this.$router.push("/login");
    }
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
  width: 80px;
  height: 100vh;
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
}
.el-icon-arrow-down {
  font-size: 15px;
}
</style>
