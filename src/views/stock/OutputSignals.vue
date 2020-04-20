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
import { getOutput } from "@/request/api";
//时间，类别，名称，客户名称，操作人
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
          createdAt: "2016-05-03",
          category: "水果",
          name: "苹果",
          num: "100",
          client: "王哥",
          operator: "admin"
        }
      ],
      header: [
        {
          prop: "createdAt",
          label: "出库时间",
          width: "170"
        },
        {
          prop: "name",
          label: "商品名称",
          width: "170"
        },
        {
          prop: "type",
          label: "类型",
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
  mounted() {
    this.getData();
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    getData() {
      getOutput({
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