<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <h2 class="h2">库存管理系统</h2>
        <NavMenu></NavMenu>
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
        <el-main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { getToken } from "@/request/api.js";
import NavMenu from "@/components/NavMenu.vue";
export default {
  name: "Home",
  components: {
    // HelloWorld
    NavMenu
  },
  data() {
    return {
      list: [1111, 2222, 3333, 4444, 5555, 6666]
    };
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
  },
  created() {
    getToken().then(res => {
      console.log(res);
    });
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
