<template>
  <div id="chart">
    <div>
      <div id="chart1" style="width: 500px;height:350px;"></div>
    </div>
    <div>
      <div id="chart2" style="width: 500px;height:350px;"></div>
    </div>
    <div>
      <div id="chart3" style="width: 500px;height:350px;"></div>
    </div>
    <div>
      <div id="chart4" style="width: 500px;height:350px;"></div>
    </div>
  </div>
</template>

<script>
import { inputSevenDay, outputSevenDay, stockNum } from "@/request/api";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    inputSevenDay().then(res => {
      this.drawChart1(res.data);
    });
    outputSevenDay().then(res => {
      this.drawChart2(res.data);
    });
    stockNum().then(res => {
      let d = res.data.map(el => {
        return {
          name: el.name,
          value: el.count
        };
      });
      this.drawChart3(d);
      // this.drawChart4(d);
    });
  },
  methods: {
    drawChart1(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("chart1"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "近七天入库频率"
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
          text: "近七天出库频率"
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
          text: "库存数量",
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
            name: "商品种类",
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
</style>