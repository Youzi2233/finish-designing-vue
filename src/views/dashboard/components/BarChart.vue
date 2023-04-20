<template>
  <div ref="chart" class="chart"></div>
</template>

<script setup lang="ts">
import echarts from "@/utils/echarts";

import { getXDate } from "@/hook/index";
import { ref, reactive, onMounted, watch } from "vue";
import { watchEffect } from "vue";
type Prop = {
  activeDay: number;
  orderAmount: number[];
};
const props = defineProps<Prop>();

const chart = ref<HTMLElement | null>();
// x 轴 最近x天
const xData = getXDate(props.activeDay);

onMounted(() => {
  const myChart = echarts.init(chart.value!);
  const option = reactive({
    color: ["#a67eb7"],
    legend: {
      bottom: 0,
      icon: "roundRect",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    xAxis: {
      type: "category",
      data: xData,
      axisTick: {
        show: false,
      },
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        name: "成交额",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        data: props.orderAmount,
      },
    ],
  });
  myChart.setOption(option);
  //   自适应
  window.addEventListener("resize", function () {
    myChart.resize();
  });
  watch(
    () => props.orderAmount,
    () => {
      option.series[0].data = props.orderAmount;
      myChart.clear();
      myChart.setOption(option);
    },
    { deep: true }
  );
});
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  height: 350px;
}
</style>
