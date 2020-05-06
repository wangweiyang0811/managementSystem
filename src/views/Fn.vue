<template>
  <div id="fn">
    <div id="pageTitle">{{ $store.state.pageTitle }}<span class="hy">欢迎使用库存管理系统</span></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
@keyframes hue {
  0% {
      background-position:0 0;
  }
  100% {
      background-position:-250px 0;
  }
}
#fn {
  #pageTitle{
    height: 40px;
    line-height: 40px;
    padding-left: 30px;
    border-radius: 10px;
    color: #666;
    font-weight: 600;
    box-shadow: 0 2px 6px 0 #d2d2d2;
    margin-bottom: 20px;
    .hy{
      margin-left: 30px;
      font-size: 25px;
      background: {
        image: linear-gradient(90deg,rgba(255, 0, 212, 0.692), rgba(36, 248, 36, 0.568), rgba(0, 132, 255, 0.8), rgba(255, 0, 212, 0.692));
      }
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: hue 1.5s infinite linear;
    }
  }
}
</style>