<template>
  <div>
    <el-row>
      <el-button type="primary" @click="addUser">添加用户</el-button>
    </el-row>
    <Model :visible="showModel" @close="close" title="添加用户">
      <el-form ref="ruleForm" :model="user" :rules="rules" label-width="80px" show-message>
        <el-form-item label="用户名" required prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" required prop="password">
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
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
import { getUser, sigin, setUserUse, deleteUser } from "@/request/api.js";
export default {
  components: {
    Table,
    Model
  },
  props: {},
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      page: 1,
      size: 15,
      count: 0,
      showModel: false,
      tableData: [],
      header: [
        {
          prop: "username",
          label: "账号",
          width: "180"
        },
        {
          prop: "use",
          label: "是否可用",
          width: "180"
        },
        {
          prop: "permissions",
          label: "权限",
          width: "180"
        },
        {
          prop: "operation",
          if: ["permissions", "超级管理员"],
          list: [
            {
              type: "disUse",
              name: "禁用",
              if: ["use", "true"]
            },
            {
              type: "use",
              name: "启用",
              if: ["use", "false"],
              btnType: "primary"
            },
            {
              type: "delete",
              name: "删除",
              icon: "el-icon-delete"
            }
          ]
        }
      ],
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请请输入密码", trigger: "change" },
          { min: 5, max: 15, message: "长度在 5 到 15 个字符", trigger: "blur" }
        ]
      }
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
    getInfo() {
      getUser({ offset: this.page, limit: this.size }).then(res => {
        if (res.code == 200) {
          this.count = res.count;
          this.tableData = res.data;
        }
      });
    },
    addUser() {
      this.showModel = true;
    },
    close() {
      this.showModel = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          sigin(this.user).then(() => {
            this.getInfo();
            this.showModel = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    delete(username) {
      this.$confirm("确定删除此用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser({ username }).then(res => {
            if (res.code == 200) {
              this.getInfo();
            } else {
              console.log("删除失败");
            }
          });
        })
        .catch(() => {});
    },
    operation(type, row) {
      switch (type) {
        case "use":
          this.setUse("true", row.username);
          break;
        case "disUse":
          this.setUse("false", row.username);
          break;
        case "delete":
          this.delete(row.username);
          break;
      }
    },
    async setUse(state, username) {
      await setUserUse({
        use: state,
        username
      });
      this.getInfo();
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
.el-form {
  width: 300px;
}
</style>
