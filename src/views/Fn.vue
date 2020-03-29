<template>
  <div id="fn">
    <div v-for="src in srcs" :key="src.index" @click="to(src.path)" :title="src.title">
      <img :src="src.img" alt />
      <span>{{ src.title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      srcs: [
        {
          img: "./img/tb.png",
          path: "/charts",
          title: "报表信息"
        },
        {
          img: "./img/rk.png",
          path: "/input",
          title: "入库信息"
        },
        {
          img: "./img/ck.png",
          path: "/output",
          title: "出库信息"
        },
        {
          img: "./img/kc.png",
          path: "/stock",
          title: "库存信息"
        },
        {
          img: "./img/kc.png",
          path: "/userinfo",
          title: "用户信息"
        },
        {
          img: "./img/kc.png",
          path: "/loginInformation",
          title: "登录信息"
        },
        {
          img: "./img/kc.png",
          path: "/warehouse",
          title: "仓库管理"
        },
        {
          img: "./img/kc.png",
          path: "/supplier",
          title: "供应商管理"
        }
      ]
    };
  },
  methods: {
    to(src) {
      this.$router.push({ path: src });
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
#fn {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin: auto;
  div {
    width: 100px;
    margin: 5%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    transition: all .2s;
    img {
      width: 100%;
    }
    span {
        text-align: center;
        font-size: 16px;
        color: #666;
    }
    &:hover{
        transform: scale(1.2);
        box-shadow: 0px 3px 5px 0 #aaa;
    }
  }
}
</style>