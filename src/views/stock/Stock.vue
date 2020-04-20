<template>
  <div>
    <el-row>
      <el-button type="primary" @click="create(undefined)">注册商品</el-button>
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
            <el-option
              v-for="item in thouse"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商" required v-show="operationType == 'input'">
          <el-select v-model="goods.supplier"  placeholder="请选择供应商">
            <el-option
              v-for="item in supplier"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户" v-show="operationType == 'output'">
          <el-input v-model="goods.client" placeholder="客户名"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="num" v-show="operationType !== 'add'">
          <el-input v-model="goods.num" min=1 :max="max" type="number"></el-input>
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
  zhStock
} from "@/request/api";

export default {
  components: {
    Table,
    Model
  },
  props: {},
  data() {
    return {
      page: 1,
      size: 15,
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
      thouse: [],
      supplier: [],
      goods: {
        name: " ",
        type: " ",
        size: " ",
        house: " ",
        supplier: null,
        num: 0,
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
      ]
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
      console.log(val);
    },
    create(data) {
      this.goods = { ...data, supplier: " " } || {
        name: " ",
        type: " ",
        size: " ",
        house: " ",
        supplier: null,
        num: 0
      };
      this.goods.num = 0;
      this.goods.operator = this.$store.state.userinfo.username;
      this.thouse = JSON.parse(JSON.stringify(this.house));
      if (this.operationType === "change") {
        this.thouse = this.thouse.filter(item => {
          return item.name != this.goods.house;
        });
        this.goods.house = "";
      }
      this.showModel = true;
    },
    getData() {
      getStock({
        offset: this.page,
        limit: this.size
      }).then(res => {
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
          switch (this.operationType) {
            case "add":
              creatStock(this.goods).then(() => {
                this.getData();
                this.close();
              });
              break;
            case "input":
              creatInput(this.goods).then(() => {
                this.getData();
                this.close();
              });
              break;
            case "output":
              creatOutput(this.goods).then(() => {
                this.getData();
                this.close();
              });
              break;
            case "change":
              zhStock(this.goods).then(async (res) => {
                await creatOutput(this.goods);
                let b = JSON.parse(JSON.stringify(this.goods));
                await creatInput(Object.assign(b,{id: res.data.id}));
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
      v < 0 ? this.goods.num = 0 : null;
      v > this.max ? this.goods.num = this.max : null;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>