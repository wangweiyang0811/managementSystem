<template>
  <div id="chart">
    <div>
      <el-input placeholder="商品名" v-model="input.name" class="input-with-select">
        <el-select v-model="input.day" slot="prepend" @change="inputChange" placeholder="请选择">
          <el-option
            v-for="item in sel"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button slot="append" @click="inputChange(input.day)" icon="el-icon-search"></el-button>
      </el-input>
      <div id="chart1" style="width: 500px;height:350px;"></div>
    </div>
    <div>
      <el-input placeholder="商品名" v-model="output.name" class="input-with-select">
        <el-select v-model="output.day" slot="prepend" @change="outputChange" placeholder="请选择">
          <el-option
            v-for="item in sel"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button slot="append" @click="outputChange(output.day)" icon="el-icon-search"></el-button>
      </el-input>
      <div id="chart2" style="width: 500px;height:350px;"></div>
    </div>
    <div>
      <el-input placeholder="商品名" v-model="stock.val" class="input-with-select">
        <el-select v-model="stock.type" slot="prepend" placeholder="请选择">
          <el-option label="仓库" value="house"></el-option>
          <el-option label="商品" value="name"></el-option>
        </el-select>
        <el-button slot="append" @click="stockSearch" icon="el-icon-search"></el-button>
      </el-input>
      <div id="chart3" style="width: 500px;height:350px;"></div>
    </div>
    <div>
      <el-select v-model="login" @change="loginChange" placeholder="请选择">
        <el-option
          v-for="item in sel"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div id="chart4" style="width: 500px;height:350px;"></div>
    </div>
  </div>
</template>

<script>
import { inputSevenDay, outputSevenDay, stockNum, loginStep } from "@/request/api";
export default {
  data() {
    return {
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
        }
      ],
      input: {
        day: 7
      },
      output: {
        day: 7
      },
      login: 7,
      stock: {
        val: "",
        type: "house"
      }
    };
  },
  created() {},
  mounted() {
    inputSevenDay({ day: this.input.day }).then(res => {
      this.drawChart1(res.data);
    });
    outputSevenDay({ day: this.output.day }).then(res => {
      this.drawChart2(res.data);
    });
    this.getStock();
    loginStep({ day: this.login }).then(res => {
      let d = res.data.map(el => {
        return {
          name: el.username,
          value: el.count
        };
      });
      this.drawChart4(d);
    });
  },
  methods: {
    inputChange(e) {
      let data = { day: e };
      if (this.input.name && this.input.name.trim()) {
        data.name = this.input.name;
      }
      inputSevenDay(data).then(res => {
        this.drawChart1(res.data);
      });
    },
    getStock() {
      stockNum(this.stock).then(res => {
        let d = res.data.map(el => {
          if (this.stock.type == "house") {
            return {
              name: el.name,
              value: el.count
            };
          } else {
            return {
              name: el.house,
              value: el.count
            };
          }
        });
        this.drawChart3(d);
      });
    },
    stockSearch() {
      this.stock.val = this.stock.val.trim();
      this.getStock(this.stock);
    },
    outputChange(e) {
      let data = { day: e };
      if (this.output.name && this.output.name.trim()) {
        data.name = this.output.name;
      }
      outputSevenDay(data).then(res => {
        this.drawChart2(res.data);
      });
    },
    loginChange(e) {
      loginStep({ day: e }).then(res => {
        let d = res.data.map(el => {
          return {
            name: el.username,
            value: el.count
          };
        });
        this.drawChart4(d);
      });
    },
    drawChart1(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("chart1"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "入库频率"
        },
        xAxis: {
          type: "category",
          data: Object.keys(data).map(str => str.substr(5))
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: Object.values(data),
            type: "line"
          }
        ]
      };
      myChart.setOption(option);
    },
    drawChart2(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("chart2"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "出库频率"
        },
        xAxis: {
          type: "category",
          data: Object.keys(data).map(str => str.substr(5))
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: Object.values(data),
            type: "line"
          }
        ]
      };
      myChart.setOption(option);
    },
    drawChart3(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("chart3"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "库存数量"
        },
        tooltip: {},
        legend: {
          data: ["库存"]
        },
        xAxis: {
          data: data.map(el => el.name)
        },
        yAxis: {},
        series: [
          {
            name: "数量",
            type: "bar",
            data: data.map(el => el.value)
          }
        ]
      };
      myChart.setOption(option);
    },
    drawChart4(data) {
      let myChart = this.$echarts.init(document.getElementById("chart4"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "用户登录次数",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} "
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: data.map(el => el.name)
        },
        series: [
          {
            name: "登录次数",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
#app {
  #chart {
    display: flex;
    flex-wrap: wrap;
    min-width: 1000px;
    justify-content: space-around;
    & > div {
      width: 50%;
      margin: auto;
    }
  }
}

</style>