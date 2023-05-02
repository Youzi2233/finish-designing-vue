<template>
  <div class="order-card">
    <!-- 待付款 -->
    <van-badge v-for="item in data" :dot="item.showPoint">
      <div class="card" @click="handleClick(item.orderStatus)">
        <van-icon class="icon" :name="item.iconName" />
        <span class="title">{{ item.title }}</span>
      </div>
    </van-badge>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { getCount } from "../api/index";
import { reactive } from "vue";
const data = reactive([
  {
    title: "待付款",
    orderStatus: "未付款",
    iconName: "peer-pay",
    showPoint: true,
    number: 0,
  },
  {
    title: "待收货",
    orderStatus: "已发货",
    iconName: "send-gift-o",
    showPoint: true,
    number: 0,
  },
  {
    title: "订单完成",
    orderStatus: "订单完成",
    iconName: "diamond-o",
    showPoint: false,
  },
]);
const router = useRouter();
const handleClick = (orderStatus: string) => {
  router.push({
    path: "/order",
    query: {
      orderStatus,
    },
  });
};
getCount().then((res) => {
  data[0].number = res.data.noPay;
  data[0].showPoint = data[0].number > 0 ? true : false;
  data[1].number = res.data.noReceive;
  data[1].showPoint = data[1].number > 0 ? true : false;
});
</script>

<style lang="less" scoped>
.order-card {
  width: 95vw;
  border-radius: 20px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-evenly;
  user-select: none;
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
