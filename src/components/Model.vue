<template>
  <el-dialog :title="title" :visible.sync="visible" :before-close="handleClose">
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss" scoped>
.el-dialog {
  width: 600px;
}
</style>
