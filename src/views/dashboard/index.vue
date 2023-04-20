<template>
  <div class="dashboard">
    <!-- 卡片区 -->
    <div class="card-list">
      <infoCard
        title="活跃顾客总数"
        iconName="shoucangyonghu"
        :num="dashboardData.activeCustomerCount"
      />
      <infoCard
        title="订单成交总额"
        iconName="shujuzhanshi"
        :num="dashboardData.orderAmountSum"
      />
      <infoCard
        title="新用户总数"
        iconName="a-mubiaodaohang"
        :num="dashboardData.newCustomerCountSum"
      />
      <infoCard
        title="订单总数"
        iconName="a-wanchengjilu"
        :num="dashboardData.orderCountSum"
      />
      <infoCard
        title="商品数量"
        iconName="a-rizhiguanli"
        :num="dashboardData.productCount"
      />
    </div>
    <!-- 图表区 -->
    <div class="chart">
      <h3 class="title">近七日订单/新用户数量</h3>
      <Chart
        :orderCount="dashboardData.orderCount"
        :newCustomerCount="dashboardData.newCustomerCount"
        :activeDay="7"
      />
    </div>
    <div class="chart">
      <h3 class="title">近七日订单成交额</h3>
      <BarChart :orderAmount="dashboardData.orderAmount" :activeDay="7" />
    </div>
  </div>
</template>

<script setup lang="ts">
import infoCard from "./components/infoCard.vue";
import Chart from "./components/Chart.vue";
import BarChart from "./components/BarChart.vue";
import { getDashboard } from "./api/index";
import type { DashboardData } from "./api/index";
import { ref } from "vue";

const dashboardData = ref<DashboardData>({
  // 活跃顾客总数
  activeCustomerCount: 0,
  // 订单总数
  orderCountSum: 0,
  // 成交总额
  orderAmountSum: 0,
  // 新用户总数
  newCustomerCountSum: 0,
  // 商品数量
  productCount: 0,
  // 近七日订单数量
  orderCount: [],
  // 近七日成交额
  orderAmount: [],
  // 近七日新用户数量
  newCustomerCount: [],
});

getDashboard().then((res) => {
  console.log(res);
  dashboardData.value = res.data;
});
</script>

<style lang="less" scoped>
.dashboard {
  min-height: 100%;
  .card-list {
    display: flex;
    justify-content: space-between;
  }
  .chart {
    margin-top: 15px;
    padding: 10px;
    background-color: #fff;
    .title {
      width: 100%;
      text-align: center;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
