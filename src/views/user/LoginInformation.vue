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
          date: "2016-05-03 02:05:60",
          username: "admin",
          ip: "******************"
        },
        {
          date: "2016-05-03",
          username: "admin",
          ip: "******************"
        }
      ],
      header: [
        {
          prop: "date",
          label: "时间",
          width: "170"
        },
        {
          prop: "username",
          label: "用户名",
          width: "180"
        },
        {
          prop: "ip",
          label: "IP地址"
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