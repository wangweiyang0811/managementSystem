<template>
  <div class="login-page" @keyup.enter="login">
    <div class="box">
      <div class="login-box">
        <h3>库存管理系统</h3>
      </div>
      <div class="login-box">
        <el-input
          placeholder="用户名"
          v-model="userName.value"
          @input="userNameChange"
          size="medium"
          autofocus="true"
          ref="myInput"
          :suffix-icon="userNameUseable"
          title="用户名格式为数字、字母下、划线，5到12位"
        ></el-input>
        <el-input
          placeholder="密码"
          v-model="passWord.value"
          @input="passWordChange"
          size="medium"
          type="password"
          :suffix-icon="passWordUseable"
          title="密码格式为数字、字母、下划线，5到12位"
        ></el-input>
        <el-button @click="login" :disabled="disabled" type="primary" title="登录">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login, setLoginInfo } from "@/request/api.js";
export default {
  data() {
    return {
      disabled: true,
      userName: {
        value: "",
        usable: null
      },
      passWord: {
        value: "",
        usable: null
      }
    };
  },
  mounted() {
    this.$refs.myInput.focus();
  },
  methods: {
    async login() {
      if (this.canLogIn()) {
        let res = await login({
          username: this.userName.value,
          password: this.passWord.value
        });
        if (res.code == 200) {
          this.$store.dispatch("setUserinfo", res.data);
          this.$store.dispatch("setToken", res.token);
          await this.setLogin();
          this.$message({
            message: "登陆成功",
            type: "success"
          });
          this.$router.push({ path: "/" });
        } else {
          this.$message({
            message: "用户名或密码错误，请重新输入！",
            type: "error"
          });
        }
      }
    },
    async setLogin() {
      let ip = sessionStorage.getItem("ip");
      let area = sessionStorage.getItem("area");
      let state = await setLoginInfo({
        username: this.userName.value,
        ip,
        area
      });
      if (state) {
        return true;
      }
      return false;
    },
    userNameChange(value) {
      const reg = /^\w{5,12}$/gi;
      this.userName.usable = reg.test(value);
      if (value.length === 0) {
        this.userName.usable = null;
      }
      this.canLogIn();
    },
    passWordChange(value) {
      const reg = /^\w{5,12}$/gi;
      this.passWord.usable = reg.test(value);
      if (value.length === 0) {
        this.passWord.usable = null;
      }
      this.canLogIn();
    },
    canLogIn() {
      this.disabled = !(this.passWord.usable && this.userName.usable);
      return !this.disabled;
    }
  },
  computed: {
    userNameUseable() {
      const str = this.userName.usable === false ? "el-icon-error" : "";
      return str;
    },
    passWordUseable() {
      const str = this.passWord.usable === false ? "el-icon-error" : "";
      return str;
    }
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  background: url("/img/login-bg.jpg") no-repeat center center;
  background-size: cover;
  // filter: ;
  .box {
    width: 600px;
    display: flex;
    height: 200px;
    .login-box {
      width: 300px;
      padding: 20px 0px;
      box-sizing: border-box;
      height: 100%;
      margin: auto;
      background: rgba(255, 255, 255, 0.4);
      h3 {
        text-align: center;
        font-size: 28px;
        line-height: 160px;
        padding: 0;
        margin: 0;
        color: #fff;
      }
      .el-input {
        width: 250px;
        height: 40px;
        display: block;
        margin: 10px auto;
      }
      .el-button {
        display: block;
        margin: 0 auto;
        color: #fff;
        width: 250px;
        font-size: 16px;
      }
    }
  }
}
</style>
