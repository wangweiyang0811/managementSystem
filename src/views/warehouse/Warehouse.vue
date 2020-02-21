<template>
  <div>
    <Table :data="tableData" :header="header"></Table>
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
  data() {
    return {
      tableData: [
        {
          name: "王小虎",
          date: "2016-05-03",
          creator: "admin",
          address: "地址..."
        }
      ],
      header: [
        {
          prop: "name",
          label: "仓库名",
          width: "180"
        },
        {
          prop: "date",
          label: "创建时间",
          width: "170"
        },
        {
          prop: "creator",
          label: "创建者",
          width: "170"
        },
        {
          prop: "address",
          label: "仓库地址"
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