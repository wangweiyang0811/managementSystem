<template>
  <div id="inp">
    <el-input placeholder="商品名" v-model="input.name" class="input-with-select">
      <el-select v-model="input.day" slot="prepend" @change="inputChange" placeholder="请选择">
        <el-option
          v-for="item in sel"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-input>
    <el-button slot="append" @click="inputChange(input.day)" icon="el-icon-search"></el-button>
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
import { getInput, getInputByTime } from "@/request/api";
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
      input: {
        day: 7,
        name: ""
      },
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
          label: "入库数量",
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
      this.page = val;
      this.all ? this.inputChange() : this.getData();
    },
    getData() {
      this.all = false;
      getInput({
        offset: this.page,
        limit: this.size
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.count = res.count;
        }
      });
    },
    inputChange() {
      let data = { day: this.input.day, offset: this.page, limit: this.size };
      if (this.input.name && this.input.name.trim()) {
        data.name = this.input.name;
      }
      this.all = true;
      getInputByTime(data).then(res => {
        console.log(res)
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