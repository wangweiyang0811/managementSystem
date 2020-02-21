<template>
  <div>
    <Table :data="tableData" :header="header" />
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
export default {
  components: {
    Table
  },
  props: {},
  data() {
    return {
      tableData: [
        {
          username: "admin",
          permissions: "超级管理员",
          password: "aaaa"
        },
        {
          username: "wwwww",
          permissions: "管理员",
          password: "wwwww"
        }
      ],
      header: [
        {
          prop: "username",
          label: "账号",
          width: "180"
        },
        {
          prop: "password",
          label: "密码",
          width: "180"
        },
        {
          prop: "permissions",
          label: "权限"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
</style>