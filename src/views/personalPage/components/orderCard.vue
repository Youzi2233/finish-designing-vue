<template>
  <div class="order-card">
    <!-- 待付款 -->
    <div
      class="card"
      v-for="item in data"
      @click="handleClick(item.orderStatus)"
    >
      <van-icon class="icon" :name="item.iconName" />
      <span class="title">{{ item.title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const data = [
  {
    title: "待付款",
    orderStatus: "未付款",
    iconName: "peer-pay",
  },
  {
    title: "待收货",
    orderStatus: "已发货",
    iconName: "send-gift-o",
  },
  {
    title: "订单完成",
    orderStatus: "订单完成",
    iconName: "diamond-o",
  },
];
const router = useRouter();
const handleClick = (orderStatus: string) => {
  router.push({
    path: "/order",
    query: {
      orderStatus,
    },
  });
};
</script>

<style lang="less" scoped>
.order-card {
  width: 95vw;
  border-radius: 20px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-evenly;
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon {
      font-size: 30px;
      font-weight: 500;
    }
    .title {
      color: #000;
      margin: 5px;
    }
  }
}
</style>
