<template>
  <el-table :data="data" border style="width: 100%" size="small" v-loading="loading">
    <template v-for="item in header">
      <el-table-column label="操作" v-if="item.prop == 'operation'" :key="item.index">
        <template slot-scope="scope" v-if="show(item, scope)">
          <el-button
            v-for="el in item.list"
            :key="el.index"
            :type="el.btnType || 'danger'"
            :icon="el.icon"
            size="mini"
            v-show="operationBtnShow(el, scope.row)"
            :title="el.name"
            @click="handleEdit(scope.$index, scope.row, el.type)"
          >{{ el.name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :key="item.index"
      ></el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  components: {},
  props: {
    header: {
      type: Array,
      required: false
    },
    data: {
      type: Array,
      required: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleEdit(index, row, type) {
      this.$emit("operation", type, row, index);
    },
    show(item, scope) {
      if (item.if) {
        return scope.row[item.if[0]] !== item.if[1];
      } else {
        return true;
      }
    },
    operationBtnShow(el, row) {
      if (hasOwnProperty.call(el, "if")) {
        return row[el.if[0]] == el.if[1];
      }
      return true;
    }
  },
  computed: {},
  watch: {}
};
</script>
