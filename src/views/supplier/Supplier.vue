<template>
  <div>
    <el-row>
      <el-button type="primary" @click="addSupplier">添加供应商</el-button>
    </el-row>
    <Model :visible="showModel" @close="close" :title="edits ? '修改供应商信息' :'添加供应商'">
      <el-form ref="ruleForm" :model="supplier" :rules="rules" label-width="80px" show-message>
        <el-form-item label="商家名" required prop="name">
          <el-input v-model="supplier.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" required prop="contact">
          <el-input v-model="supplier.contact"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" required prop="phoneCode">
          <el-input v-model="supplier.phoneCode"></el-input>
        </el-form-item>
        <el-form-item label="地址" required prop="address">
          <el-input v-model="supplier.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-show="!edits" type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
          <el-button v-show="edits" type="primary" @click="onEdits('ruleForm')">立即修改</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </Model>

    <Table :data="tableData" :header="header" @operation="operation"></Table>
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
  getSupplier,
  creatSupplier,
  deleteSupplier,
  updateSupplier
} from "@/request/api";
export default {
  components: {
    Table,
    Model
  },
  data() {
    return {
      size: 15,
      page: 1,
      count: 1,
      showModel: false,
      edits: false,
      loading: false,
      supplier: {
        id: "",
        name: "",
        contact: "",
        phoneCode: "",
        address: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入供应商名称", trigger: "change" }
        ],
        contact: [
          { required: true, message: "请输入联系人", trigger: "change" }
        ],
        phoneCode: [
          { required: true, message: "请输入联系人电话", trigger: "change" }
        ],
        address: [
          { required: true, message: "请请输入仓库地址", trigger: "change" }
        ]
      },
      tableData: [],
      header: [
        {
          prop: "name",
          label: "商家名",
          width: "150"
        },
        {
          prop: "contact",
          label: "联系人",
          width: "120"
        },
        {
          prop: "phoneCode",
          label: "联系电话",
          width: "120"
        },
        {
          prop: "creator",
          label: "创建者",
          width: "140"
        },
        {
          prop: "address",
          label: "商家地址",
          width: "300"
        },
        {
          prop: "operation",
          list: [
            {
              type: "edits",
              name: "编辑",
              btnType: "info",
              icon: "el-icon-edit"
            },
            { type: "delete", name: "删除", icon: "el-icon-delete" }
          ]
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
    operation(type, row) {
      switch (type) {
        case "edits":
          this.editsData(row);
          break;
        case "delete":
          this.delete(row);
          break;
      }
    },
    delete(row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteSupplier({ id: row.id }).then(res => {
            if (res.code == 200) {
              this.getDate();
            } else {
              console.log(res.msg);
            }
          });
        })
        .catch(() => {});
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showModel = false;
          creatSupplier(
            Object.assign(this.supplier, {
              creator: "admin"
            })
          ).then(res => {
            if (res.code == 200) {
              this.getData();
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
    onEdits(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.showModel = false;
          updateSupplier(this.supplier).then(res => {
            if (res.code == 200) {
              this.getData();
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
    getData() {
      this.loading = true;
      getSupplier({
        offset: this.page,
        limit: this.size
      })
        .then(res => {
          if (res.code == 200) {
            this.tableData = res.data;
            this.count = res.count;
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    addSupplier() {
      this.edits = false;
      this.showModel = true;
      this.supplier = {
        name: "",
        contact: "",
        phoneCode: "",
        address: ""
      };
    },
    editsData(row) {
      this.edits = true;
      this.showModel = true;
      let { id, name, contact, phoneCode, address } = row;
      this.supplier = {
        id,
        name,
        contact,
        phoneCode,
        address
      };
    },
    close() {
      this.showModel = false;
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
</style>