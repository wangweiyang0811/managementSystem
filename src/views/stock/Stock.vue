<template>
  <div>
    <el-row>
      <el-button type="primary" @click="create(undefined)">注册商品</el-button>
    </el-row>
    <el-row>
      <el-input placeholder="请输入商品" v-model="searchModel.name">
        <template slot="prepend">商品名</template>
      </el-input>
      <el-input placeholder="请输入种类" v-model="searchModel.type">
        <template slot="prepend">种类</template>
      </el-input>
      <el-input placeholder="请输入尺寸" v-model="searchModel.size">
        <template slot="prepend">尺寸</template>
      </el-input>
      <el-input placeholder="请输入仓库" v-model="searchModel.house">
        <template slot="prepend">仓库</template>
      </el-input>
      <el-button icon="el-icon-search" @click="search"></el-button>
      <el-button type="success" @click="getData" v-show="isAll">all</el-button>
    </el-row>
    <Model :visible="showModel" @close="close" :title="types.get(operationType)">
      <el-form ref="ruleForm" :model="goods" :rules="rules" label-width="80px" show-message>
        <el-form-item label="商品名" required prop="name">
          <el-input v-model="goods.name" :disabled="operationType !== 'add'"></el-input>
        </el-form-item>
        <el-form-item label="种类" required prop="type">
          <el-input v-model="goods.type" :disabled="operationType !== 'add'"></el-input>
        </el-form-item>
        <el-form-item label="尺寸" required prop="size">
          <el-input v-model="goods.size" :disabled="operationType !== 'add'"></el-input>
        </el-form-item>
        <el-form-item required label="仓库" v-show="operationType !== 'output'">
          <el-select v-model="goods.house" placeholder="请选择仓库" :disabled="operationType == 'input'">
            <el-option v-for="item in thouse" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商" required v-show="operationType == 'input'">
          <el-select v-model="goods.supplier" placeholder="请选择供应商">
            <el-option
              v-for="item in supplier"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户" required v-show="operationType == 'output'">
          <el-input v-model="goods.client" placeholder="客户名"></el-input>
        </el-form-item>
        <el-form-item label="数量" required prop="num" v-show="operationType !== 'add'">
          <el-input v-model="goods.num" min="1" :max="max" type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">确定</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </Model>

    <Table :data="tableData" :header="header" @operation="operation" />
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
import Model from "@/components/Model.vue";
import {
  creatInput,
  creatOutput,
  creatStock,
  deleteStock,
  getStock,
  getAllHouse,
  getAllSupplier,
  zhStock,
  searchStock
} from "@/request/api";

export default {
  components: {
    Table,
    Model
  },
  props: {},
  data() {
    return {
      searchModel: {},
      select: "name",
      page: 1,
      size: 15,
      isAll: false,
      count: 0,
      showModel: false,
      operationType: "add",
      max: 1000,
      types: new Map([
        ["add", "注册商品"],
        ["input", "商品入库"],
        ["output", "商品出库"],
        ["change", "商品调度"]
      ]),
      house: [],
      h: " ",
      thouse: [],
      supplier: [],
      goods: {
        name: " ",
        type: " ",
        size: " ",
        house: " ",
        supplier: null,
        num: 1,
        client: " "
      },
      rules: {
        name: [{ required: true, message: "请输入商品名", trigger: "change" }]
      },
      tableData: [],
      header: [
        {
          prop: "name",
          label: "商品名称"
        },
        {
          prop: "type",
          label: "种类"
        },
        {
          prop: "size",
          label: "尺寸"
        },
        {
          prop: "num",
          label: "库存数量"
        },
        {
          prop: "house",
          label: "仓库"
        },
        {
          prop: "operation",
          if: ["permissions", "超级管理员"],
          list: [
            {
              type: "input",
              name: "入库",
              btnType: "primary"
            },
            {
              type: "output",
              name: "出库",
              btnType: "primary"
            },
            {
              type: "change",
              name: "转仓",
              btnType: "primary"
            },
            {
              type: "delete",
              name: "删除",
              icon: "el-icon-delete"
            }
          ],
          width: 350
        }
      ],
      targetData: {}
    };
  },
  created() {},
  mounted() {
    this.getData();
    getAllHouse().then(res => {
      this.house = res.data;
    });
    getAllSupplier().then(res => {
      this.supplier = res.data;
    });
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      if (this.isAll){
        this.getType();
      } else {
        this.getData();
      }
    },
    search() {
      let model = {};
      for (let val in this.searchModel) {
        this.searchModel[val].trim() ?
        model[val] = this.searchModel[val].trim() :
        undefined;
      }
      if (Object.keys(model).length === 0) {
        return;
      }
      this.getType(model);
    },
    create(data) {
      this.goods = { ...data, supplier: " " } || {
        name: " ",
        type: " ",
        size: " ",
        house: " ",
        supplier: null,
        num: 1
      };
      this.goods.num = 1;
      console.log(this.thouse[0])
      this.goods.operator = this.$store.state.userinfo.username;
      this.thouse = JSON.parse(JSON.stringify(this.house));
      if (this.operationType === "change") {
        this.thouse = this.thouse.filter(item => {
          return item.name != this.goods.house;
        });
        this.goods.house = this.thouse[0].name;
      }
      if (this.operationType === "input") {
        this.goods.supplier = this.supplier[0].name;
      }
      this.h = data ? data.house : "";
      this.showModel = true;
      this.targetData = data;
    },
    getData() {
      getStock({
        offset: this.page,
        limit: this.size
      }).then(res => {
        this.isAll = false;
        this.tableData = res.data;
      });
    },
    getType(model) {
      searchStock({
        model,
        offset: this.page,
        limit: this.size
      }).then(res => {
        this.isAll = true;
        this.tableData = res.data;
      });
    },
    close() {
      this.showModel = false;
      setTimeout(() => {
        this.operationType = "add";
      }, 0);
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.goods.num < 1 || this.goods.num > 9999) {
            this.$message({
              message: "数量超出限制，应处于1 ~ 9999 之间！",
              type: "error"
            });
            return;
          }
          switch (this.operationType) {
            case "add":
              creatStock(this.goods).then(() => {
                this.getData();
                this.close();
              });
              break;
            case "input":
              console.log(this.goods)
              creatInput(this.goods).then(() => {
                this.getData();
                this.close();
              });
              break;
            case "output":
              if (!this.goods.client) {
                return this.$message({
                  message: "请填写客户名称！",
                  type: "error"
                });
              }
              creatOutput(this.goods).then(() => {
                this.getData();
                this.close();
              });
              break;
            case "change":
              if (this.targetData.num < this.goods.num) {
                return this.$message({
                  message: "超出库存数量，请重新输入！",
                  type: "error"
                });
              }
              zhStock(this.goods).then(async res => {
                await creatOutput({ ...this.goods, client: this.h });
                let b = JSON.parse(JSON.stringify(this.goods));
                await creatInput(Object.assign(b, { id: res.data.id }));
                this.getData();
                this.close();
              });
              break;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    operation(type, row) {
      switch (type) {
        case "delete":
          this.delete(row);
          break;
        case "input":
          this.operationType = "input";
          this.create(row);
          break;
        case "output":
          this.operationType = "output";
          this.max = row.num;
          this.create(row);
          break;
        case "change":
          this.operationType = "change";
          this.max = row.num;
          this.create(row);
          break;
      }
    },
    delete(row) {
      this.$confirm("确定删除此商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteStock({ id: row.id }).then(res => {
            if (res.code == 200) {
              this.getData();
            } else {
              console.log(res.msg);
            }
          });
        })
        .catch(() => {});
    }
  },
  computed: {},
  watch: {
    "goods.num"(v) {
      v < 0 ? (this.goods.num = 1) : null;
      v > this.max ? (this.goods.num = this.max) : null;
    }
  }
};
</script>