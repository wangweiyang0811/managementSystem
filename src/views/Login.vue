<template>
  <div class="login-page" @keyup.enter="login">
    <div class="login-box">
      <h3>库存管理系统</h3>
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
      <el-button
        @click="login"
        :disabled="disabled"
        type="primary"
        title="登录"
      >
        登录
      </el-button>
    </div>
  </div>
</template>

<script>
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
    login() {
      if (this.canLogIn()) {
        let userinfo = this.$store.state.userinfo;
        userinfo = { token: "abc", name: this.userName.value };
        this.$store.dispatch("setUserinfo", userinfo);
        this.$router.push({ path: "/" });
      }
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
  background: url("/img/login-bg.jpg") no-repeat center center;
  background-size: cover;
  .login-box {
    width: 400px;
    padding: 20px 0px;
    transform: translateY(-4vw);
    box-sizing: border-box;
    margin: auto;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 10px 0 #aaa;
    border-radius: 20px;
    h3 {
      text-align: center;
      font-size: 28px;
      padding: 0;
      margin: 15px 0 30px 0;
      color: #ddd;
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
      font-size: 16px;
    }
  }
}
</style>
