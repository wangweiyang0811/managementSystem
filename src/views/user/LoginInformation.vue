<template>
  <div>
    <Table :data="tableData" :header="header" :loading="loading" />
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
import { getLoginInfo } from "@/request/api";
export default {
  components: {
    Table
  },
  props: {},
  data() {
    return {
      size: 15,
      page: 1,
      tableData: [],
      count: 0,
      loading: false,
      header: [
        {
          prop: "username",
          label: "用户名",
          width: "150"
        },
        {
          prop: "createdAt",
          label: "登录时间",
          width: "170"
        },
        {
          prop: "ip",
          label: "IP",
          width: "150"
        },
        {
          prop: "area",
          label: "城市"
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.getInfo();
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getInfo();
    },
    async getInfo() {
      this.loading = true;
      let res = await getLoginInfo({
        limit: this.size,
        offset: this.page,
        name: this.$store.state.userinfo.username,
        permissions: this.$store.state.userinfo.permissions == "超级管理员" ? true : false
      });
      this.tableData = res.data;
      this.count = res.count;
      this.loading = false;
    }
  },
  computed: {},
  watch: {}
};
</script>
