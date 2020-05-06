<template>
  <div id="out">
    <el-input placeholder="商品名" v-model="output.name" class="input-with-select">
      <el-select v-model="output.day" slot="prepend" @change="outputChange" placeholder="请选择">
        <el-option
          v-for="item in sel"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-input>
    <el-button slot="append" @click="outputChange" icon="el-icon-search"></el-button>
    <el-button type="success" @click="getData" v-show="all">all</el-button>
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
import { getOutput, getOutputByTime } from "@/request/api";
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
      all: false,
      searchModel: {},
      sel: [
        {
          label: "近七天",
          value: 7
        },
        {
          label: "近一个月",
          value: 30
        },
        {
          label: "近三个月",
          value: 90
        },
        {
          label: "所有",
          value: "all"
        }
      ],
      output: {
        day: 7,
        name: ""
      },
      tableData: [],
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
          label: "出库数量",
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
      this.all ? this.outputChange() : this.getData();
    },
    getData() {
      this.all = false;
      getOutput({
        offset: this.page,
        limit: this.size
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.count = res.count;
        }
      });
    },
    outputChange() {
      let data = { day: this.output.day, offset: this.page, limit: this.size };
      if (this.output.name && this.output.name.trim()) {
        data.name = this.output.name;
      }
      this.all = true;
      getOutputByTime(data).then(res => {
        this.tableData = res.data;
        this.count = res.count;
      })
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
</style>