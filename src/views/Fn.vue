<template>
  <div id="fn">
    <h1>库存管理系统</h1>
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
#fn {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: {
    image: linear-gradient(45deg,rgba(255, 0, 212, 0.692), rgba(255, 255, 255, 0.568), rgba(0, 132, 255, 0.8))
  }
  margin: -20px;
  h1{
    color: #fff;
    font-size: 5vw;
    margin-top: -10vh;
    text-shadow: 5px 5px 1px #000, 4px 4px 1px #000, 3px 3px 1px #000;
  }
}
</style>