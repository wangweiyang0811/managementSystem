<template>
  <el-breadcrumb :separator="separator" :separator-class="separatorClass">
    <template v-for="item in list">
      <el-breadcrumb-item :to="{ path: item.path }" :key="item.path">{{item.title}}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
export default {
  components: {},
  props: {
    replace: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: "/"
    },
    separatorClass: {
      type: String,
      required: false
    },
    list: {
      type: Array,
      default: new Array()
    }
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {}
};
</script>
