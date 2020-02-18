<template>
  <div class="error">{{ text }}</div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      text: "你走错地方了"
    };
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
.error {
  color: #999;
}
</style>
