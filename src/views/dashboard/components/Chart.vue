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
  orderCount: number[];
  newCustomerCount: number[];
};
const props = defineProps<Prop>();

const chart = ref<HTMLElement | null>();
// x 轴 最近x天
const xData = getXDate(props.activeDay);

onMounted(() => {
  const myChart = echarts.init(chart.value!);
  const option = reactive({
    color: ["#ea5514", "skyblue"],
    legend: {
      bottom: 0,
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
        type: "line",
        name: "订单数量",
        smooth: true,
        symbol: "circle",
        areaStyle: {},
        symbolSize: 6,
        data: props.orderCount,
      },
      {
        type: "line",
        name: "新用户数量",
        smooth: true,
        symbol: "circle",
        areaStyle: {},
        symbolSize: 6,
        data: props.newCustomerCount,
      },
    ],
  });
  myChart.setOption(option);
  //   自适应
  window.addEventListener("resize", function () {
    myChart.resize();
  });
  watch(
    [() => props.orderCount, () => props.newCustomerCount],
    () => {
      option.series[0].data = props.orderCount;
      option.series[1].data = props.newCustomerCount;
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
