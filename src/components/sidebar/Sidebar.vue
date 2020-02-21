<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409EFF"
      router
      :default-active="index"
    >
      <sidebar-item v-for="item in list" :key="item.path" :item="item" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from "./SidebarItem.vue";
export default {
  components: {
    SidebarItem
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      index: ""
    };
  },
  mounted() {
    this.index = this.$route.path;
  }
};
</script>
