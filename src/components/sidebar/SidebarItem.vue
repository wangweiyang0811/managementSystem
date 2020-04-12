<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowChild(item.children) && !onlyChild.children">
      <el-menu-item :index="onlyChild.path">
        <template slot="title">
          <!-- <i :class="onlyChild.meta.icon"></i> -->
          <span>{{ onlyChild.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <template v-else>
      <el-submenu :index="item.path">
        <template slot="title">
          <!-- <i :class="item.meta.icon"></i> -->
          <span>{{ item.meta.title }}</span>
        </template>

        <template v-for="child in item.children">
          <sidebar-item :item="child" :key="child.path" />
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      onlyChild: this.item
    };
  },
  methods: {
    hasOneShowChild(children = []) {
      const showingChild = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyChild = item;
          return true;
        }
      });
      if (showingChild.length === 1) {
        return true;
      }
      if (showingChild.length === 0) {
        return true;
      }
      return false;
    }
  },
  computed: {
    hasChild() {
      return this.item.children && this.item.children.length > 0;
    }
  }
};
</script>
