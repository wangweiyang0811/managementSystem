<template>
  <div>
    <el-row>
      <el-button type="primary" @click="addHouse">添加仓库</el-button>
    </el-row>
    <Model :visible="showModel" @close="close" title="添加仓库">
      <el-form ref="ruleForm" :model="house" :rules="rules" label-width="80px" show-message>
        <el-form-item label="仓库名" required prop="name">
          <el-input v-model="house.name"></el-input>
        </el-form-item>
        <el-form-item required label="管理者">
          <el-select v-model="house.managers" placeholder="请选择管理者">
            <el-option
              v-for="item in managersList"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" required prop="address">
          <el-input v-model="house.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </Model>
    <Table :data="tableData" :header="header" @operation="operation"></Table>
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import Model from "@/components/Model.vue";
import {
  getHouse,
  creatHouse,
  getAllUser,
  deleteHouse
} from "@/request/api.js";
export default {
  components: {
    Table,
    Model
  },
  data() {
    return {
      showModel: false,
      size: 15,
      page: 1,
      house: {
        name: "",
        address: "",
        managers: undefined
      },
      managersList: [],
      tableData: [],
      header: [
        {
          prop: "name",
          label: "仓库名",
          width: "180"
        },
        {
          prop: "createdAt",
          label: "创建时间",
          width: "160"
        },
        {
          prop: "managers",
          label: "管理者",
          width: "140"
        },
        {
          prop: "address",
          label: "仓库地址",
          width: "300"
        },
        {
          prop: "operation",
          list: [{ type: "delete", name: "删除", icon: "el-icon-delete" }]
        }
      ],
      rules: {
        name: [{ required: true, message: "请输入仓库名", trigger: "change" }],
        address: [
          { required: true, message: "请请输入仓库地址", trigger: "change" }
        ]
      }
    };
  },
  created() {},
  async mounted() {
    await this.getDate();
    this.getUser();
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getDate();
    },
    addHouse() {
      this.showModel = true;
      this.house.managers = undefined;
    },
    close() {
      this.showModel = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.house.managers) {
          this.showModel = false;
          creatHouse(this.house).then(res => {
            if (res.code == 200) {
              this.getDate();
            } else {
              console.log(res.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    operation(type, row) {
      this.$confirm("确定删除此仓库?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteHouse({ id: row.id }).then(res => {
            if (res.code == 200) {
              this.getDate();
            } else {
              console.log(res.msg);
            }
          });
        })
        .catch(() => {});
    },
    async getDate() {
      let res = await getHouse({
        limit: this.size,
        offset: this.page
      });
      if (res.code == 200) {
        this.tableData = res.data;
      } else {
        console.log("获取仓库数据失败");
      }
      return true;
    },
    async getUser() {
      let res = await getAllUser();
      if (res.code == 200) {
        this.managersList = res.data;
      } else {
        console.log("获取失败");
      }
      return true;
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
</style>