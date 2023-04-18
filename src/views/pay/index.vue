<template>
  <div class="pay">
    <div class="header">
      <van-icon @click="router.back()" class="icon" name="arrow-left" />
      <h3 class="title">支付</h3>
    </div>
    <!-- 价格显示 -->
    <div class="price-show">
      <span
        >¥<span class="prefix">{{ totalPrice.prefix }}</span
        >.<span>{{ totalPrice.surfix }}</span>
      </span>
    </div>
    <!-- 订单详情 -->
    <div class="order-detail">
      <h3 class="title">订单详情</h3>
      <OrderDetail
        v-for="item in store.list"
        :img="item.productImage"
        :price-total="item.orderTotal"
        :product-name="item.productName"
        :product-quantity="item.productQuantity"
      />
    </div>
    <!-- 付款 -->
    <div class="submit-pay">
      <van-button @click="handlePay" class="btn" round type="danger"
        >确认付款</van-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { usePayProductStore } from "@/store/index";
import { computed } from "vue";
import { moneyFormat } from "@/hook/index";
import OrderDetail from "./components/OrderDetail.vue";
import { orderPay } from "./api/index";
import { showFailToast, showSuccessToast } from "vant";
const router = useRouter();
const store = usePayProductStore();
const totalPrice = computed(() => {
  let result = 0;
  store.list.forEach((item) => {
    result += item.orderTotal;
  });
  return moneyFormat(result);
});

const handlePay = async () => {
  let message = "Error";
  // store.list.forEach((item) => {
  //   orderPay({ orderId: item.orderId }).then((res) => {
  //     message = res.msg;
  //   });
  // });
  for (let i = 0; i < store.list.length; i++) {
    const res = await orderPay({ orderId: store.list[i].orderId });
    message = res.msg;
  }
  if (message.toLowerCase() === "success") {
    showSuccessToast({
      duration: 1000,
      message: "支付成功",
    });
  } else {
    showFailToast({
      duration: 1000,
      message,
    });
  }
  router.push("/personalPage");
};
</script>

<style lang="less" scoped>
.pay {
  background-color: #f2f2f2;
  min-height: 100vh;
  position: relative;
  .header {
    position: relative;
    background-color: #fff;
    .icon {
      position: absolute;
      font-size: 24px;
      top: 10px;
      left: 10px;
    }
    .title {
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      padding: 10px;
      color: #000;
    }
  }
  .price-show {
    padding: 10vw 0;
    text-align: center;
    color: red;
    font-weight: 500;
    font-size: 18px;
    .prefix {
      font-size: 28px;
    }
  }
  .order-detail {
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    .title {
      font-size: 14px;
      color: #000;
      font-weight: 500;
    }
  }
  .submit-pay {
    position: absolute;
    width: 100vw;
    padding: 10px;
    background-color: #fff;
    left: 0;
    bottom: 0;
    .btn {
      width: 100%;
    }
  }
}
</style>
