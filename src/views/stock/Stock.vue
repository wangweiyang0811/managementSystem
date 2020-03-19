<template>
  <div>
    <el-row>
      <el-button type="primary" @click="input">商品入库</el-button>
      <el-button type="primary" @click="output">商品出库</el-button>
      <el-button type="primary" @click="tohouse">仓库转</el-button>
    </el-row>
    <Table :data="tableData" :header="header" />
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="count"
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
      page: 1,
      size: 15,
      count: 0,
      tableData: [
        {
          id: "555",
          category: "水果",
          name: "苹果",
          num: "100"
        }
      ],
      header: [
        {
          prop: "id",
          label: "ID",
          width: "170"
        },
        {
          prop: "category",
          label: "商品类别",
          width: "170"
        },
        {
          prop: "name",
          label: "商品名称",
          width: "170"
        },
        {
          prop: "num",
          label: "库存数量"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleCurrentChange(val) {
      console.log(val);
    },
    input() {
      console.log("rk");
    },
    output() {
      console.log("ck");
    },
    tohouse() {
      console.log("tt");
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
</style>