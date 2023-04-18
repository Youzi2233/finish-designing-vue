<template>
  <div class="order">
    <div class="header">
      <van-icon @click="router.back()" class="icon" name="arrow-left" />
      <h3 class="title">我的订单</h3>
    </div>
    <!-- 订单分类Tab -->
    <van-tabs v-model:active="active" swipeable>
      <van-tab v-for="item in orderStatusData" :title="item.title">
        <div class="order-list" v-if="orderList.length">
          <div class="order-card" v-for="item in orderList">
            <!-- 订单 -->
            <OrderDetail
              :product-name="item.productName"
              :img="item.productImage"
              :price-total="item.orderTotal"
              :product-quantity="item.productQuantity"
            />
            <!-- 操作栏 -->
            <div class="action-bar">
              <van-button
                @click="handleAction(0, item)"
                class="btn"
                size="small"
                plain
                round
                color="#45465e"
              >
                删除订单
              </van-button>
              <van-button
                v-if="orderStatus == '未付款'"
                @click="handleAction(1, item)"
                class="btn"
                size="small"
                plain
                round
                color="#45465e"
              >
                取消订单
              </van-button>
              <van-button
                v-if="orderStatus == '已发货'"
                @click="handleAction(2, item)"
                class="btn"
                size="small"
                plain
                round
                color="#45465e"
              >
                确认收货
              </van-button>
              <van-button
                v-if="orderStatus == '未付款'"
                @click="handleAction(3, item)"
                class="btn"
                size="small"
                plain
                round
                type="danger"
              >
                去支付
              </van-button>
            </div>
          </div>
        </div>
        <!-- 无限加载组件 -->
        <infiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import OrderDetail from "@/views/pay/components/OrderDetail.vue";
import type { OrderListData } from "./api/index";
import { getOrderList, deleteOrder, receive, cancelOrder } from "./api/index";
import { ref, watch } from "vue";
import infiniteLoading from "@/components/infinite-loading.vue";
import { showSuccessToast } from "vant";
import { usePayProductStore } from "@/store";

const router = useRouter();
const route = useRoute();
const orderStatus = ref(String(route.query.orderStatus));

const orderStatusData = [
  {
    title: "待付款",
    orderStatus: "未付款",
  },
  {
    title: "已付款",
    orderStatus: "已付款",
  },
  {
    title: "已发货",
    orderStatus: "已发货",
  },
  {
    title: "订单完成",
    orderStatus: "订单完成",
  },
  {
    title: "已取消",
    orderStatus: "已取消",
  },
  {
    title: "订单关闭",
    orderStatus: "订单关闭",
  },
];

// 默认active
const index = orderStatusData.findIndex(
  (item) => item.orderStatus === orderStatus.value
);
const active = ref(index < 0 ? 0 : index);

// 根据分类获取商品列表
const orderList = ref<OrderListData[]>([]);
const pageNum = ref(0);

// 加载中
const loading = ref(false);
// 是否加载完毕
const finished = ref(false);
const getData = async () => {
  pageNum.value = pageNum.value + 1;
  loading.value = true;
  try {
    const res = await getOrderList({
      orderStatus: orderStatusData[active.value].orderStatus,
      pageNum: pageNum.value,
      pageSize: 10,
    });
    // 获取数据成功
    if (res.data.list.length) {
      // 有数据就追加数据
      orderList.value.push(...res.data.list);
    } else {
      // 没有数据，加载完成
      finished.value = true;
    }
    loading.value = false;
  } catch (error) {
    // 没有数据，加载完成
    finished.value = true;
    loading.value = false;
  }
};

// 切换分类时
watch(active, () => {
  pageNum.value = 0;
  orderList.value = [];
  orderStatus.value = orderStatusData[active.value].orderStatus;
  getData();
});

const handleAction = (action: number, order: OrderListData) => {
  switch (action) {
    // 删除订单
    case 0:
      (async () => {
        const res = await deleteOrder({ orderId: order.orderId });
        if (res.msg.toLowerCase() === "success") {
          showSuccessToast({
            duration: 1000,
            message: "删除成功",
          });
        }
        orderList.value = orderList.value.filter(
          (item) => item.orderId !== order.orderId
        );
      })();
      break;
    // 取消订单
    case 1:
      (async () => {
        const res = await cancelOrder({ orderId: order.orderId });
        if (res.msg.toLowerCase() === "success") {
          showSuccessToast({
            duration: 1000,
            message: "取消成功",
          });
        }
        orderList.value = orderList.value.filter(
          (item) => item.orderId !== order.orderId
        );
      })();
      break;
    // 确认收货
    case 2:
      (async () => {
        const res = await receive({ orderId: order.orderId });
        if (res.msg.toLowerCase() === "success") {
          showSuccessToast({
            duration: 1000,
            message: "收货成功",
          });
        }
        orderList.value = orderList.value.filter(
          (item) => item.orderId !== order.orderId
        );
      })();
      break;
    // 去支付
    default:
      (async () => {
        const payStore = usePayProductStore();
        payStore.$patch((state) => {
          state.list = [order];
        });
        router.push("/pay");
      })();
      break;
  }
};
</script>

<style lang="less" scoped>
.order {
  min-height: 100vh;
  background-color: #f2f2f2;
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
  .order-list {
    margin-top: 10px;
    .order-card {
      border-radius: 10px;
      background-color: #fff;
      padding: 10px;
      margin-bottom: 10px;
      .action-bar {
        margin-top: 10px;
        display: flex;
        justify-content: end;
        .btn {
          margin: 0 5px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
