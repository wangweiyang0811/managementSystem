<template>
  <div>
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
import { getInput } from "@/request/api";
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
      tableData: [],
      header: [
        {
          prop: "createdAt",
          label: "入库时间",
          width: "170"
        },
        {
          prop: "name",
          label: "商品名称",
          width: "170"
        },
        {
          prop: "type",
          label: "种类",
          width: "170"
        },
        {
          prop: "size",
          label: "尺寸",
          width: "170"
        },
        {
          prop: "num",
          label: "数量",
          width: "170"
        },
        {
          prop: "house",
          label: "仓库名",
          width: "170"
        },
        {
          prop: "supplier",
          label: "供应商",
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
  mounted() {
    this.getData();
  },
  methods: {
    handleCurrentChange(val) {
      console.log(val);
    },
    getData() {
      getInput({
        offset: this.page,
        limit: this.size
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.count = res.count;
        }
      });
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
</style>