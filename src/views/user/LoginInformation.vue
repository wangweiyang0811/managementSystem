<template>
  <div>
    <el-input placeholder="请输入用户名" v-model="username" v-if="$store.state.userinfo.permissions == '超级管理员'">
      <template slot="prepend">搜索</template>
    </el-input>
    <el-button icon="el-icon-search" v-show="isSearch" @click="search"></el-button>
    <el-button type="success" @click="getInfo" v-show="all">all</el-button>
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
import { getLoginInfo, getLoginByUsername } from "@/request/api";
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
      all: false,
      isSearch: false,
      username: "",
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
      this.all ? this.search() : this.getInfo();
    },
    async getInfo() {
      this.loading = true;
      this.all = false;
      let res = await getLoginInfo({
        limit: this.size,
        offset: this.page,
        name: this.$store.state.userinfo.username,
        permissions: this.$store.state.userinfo.permissions == "超级管理员" ? true : false
      });
      this.tableData = res.data;
      this.count = res.count;
      this.loading = false;
    },
    search() {
      this.all = true;
      this.loading = true;
      getLoginByUsername({
        limit: this.size,
        offset: this.page,
        username: this.username
      }).then(res => {
        this.loading = false;
        this.tableData = res.data;
        this.count = res.count;
      });
    }
  },
  computed: {},
  watch: {
    username(e){
      if (e && e.trim().length !== 0) {
        this.isSearch = true;
      } else {
        this.isSearch = false;
      }
    }
  }
};
</script>
