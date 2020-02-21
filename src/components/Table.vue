<template>
  <el-table :data="data" border style="width: 100%">
    <template v-for="item in header">
      <el-table-column :prop="item.prop" :label="item.label" :width="item.width" :key="item.index"></el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  components: {},
  props: {
    header: {
      type: Array,
      required: false
    },
    data: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      
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
</style>
