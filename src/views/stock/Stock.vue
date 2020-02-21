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