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
//时间，类别，名称，客户名称，操作人
export default {
  components: {
    Table
  },
  props: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          category: "水果",
          name: "苹果",
          num: "100",
          client: "王哥",
          operator: "admin"
        }
      ],
      header: [
        {
          prop: "date",
          label: "入库时间",
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
          label: "数量",
          width: "170"
        },
        {
          prop: "client",
          label: "客户名称",
          width: "170"
        },
        {
          prop: "operator",
          label: "操作者"
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