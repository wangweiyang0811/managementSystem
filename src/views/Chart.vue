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
// import {sevenDay} from "@/request/api";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.drawChart1();
    this.drawChart2();
    this.drawChart3();
    this.drawChart4();
    // sevenDay().then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    drawChart1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("chart1"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "货物销量"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 26, 10, 10, 20]
          }
        ]
      };
      myChart.setOption(option);
    },
    drawChart2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("chart2"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "每个月出货比例"
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      };
      myChart.setOption(option);
    },
    drawChart3() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("chart3"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
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
    },
    drawChart4() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("chart4"));
      // 指定图表的配置项和数据
      let option = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.0, 6.95],
              [13.0, 7.58],
              [9.0, 8.81],
              [11.0, 8.33],
              [14.0, 9.96],
              [6.0, 7.24],
              [4.0, 4.26],
              [12.0, 10.84],
              [7.0, 4.82],
              [5.0, 5.68]
            ],
            type: "scatter"
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