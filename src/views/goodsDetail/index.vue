<template>
  <div class="goods-detail">
    <!-- 返回按钮 -->
    <backBtn />
    <!-- 封面 -->
    <van-image width="100vw" height="100vw" :src="goodsData?.image" />
    <!-- 商品信息 -->
    <div class="goods-info">
      <!-- 价格 -->
      <div class="price">
        <span class="num">{{ `¥${goodsData?.price}` }}</span>
      </div>
      <!-- 商品名称 -->
      <h3 class="title">{{ goodsData?.name }}</h3>
      <!-- 库存 销售情况 -->
      <div class="case">
        <span class="stock">库存 </span><span>{{ goodsData?.stock }}</span>
        <span class="sales">已售 </span><span>{{ goodsData?.sales }}</span>
      </div>
    </div>
    <!-- 操作栏：加入购物车 购买 -->
    <van-action-bar>
      <van-action-bar-icon
        @click="router.push('/cartShow')"
        icon="cart-o"
        text="购物车"
        :badge="userStore.cartNum"
      />
      <van-action-bar-button
        @click="addProductToCart"
        type="warning"
        text="加入购物车"
      />
      <van-action-bar-button @click="handleBuy" type="danger" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { getGoodsDetail, addCart } from "./api/index";
import type { GoodsData } from "./api/index";
import { ref } from "vue";
import { showFailToast, showSuccessToast } from "vant";
import type { GetCartListData } from "@/views/cart/api/index";
import { useOrderProductStore } from "@/store/index";
import { useUserInfoStore } from "@/store/index";
import backBtn from "@/components/backBtn.vue";
const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const userStore = useUserInfoStore();
const goodsData = ref<GoodsData>();
getGoodsDetail({ productId: id }).then((res) => {
  goodsData.value = res.data;
});

// 加入购物车
const addProductToCart = async () => {
  const res = await addCart({ productId: id, count: 1 });
  if (res.msg.toLowerCase() === "success") {
    userStore.getCartSum();
    showSuccessToast({
      duration: 1000,
      message: "添加成功",
    });
  } else {
    showFailToast({
      duration: 1000,
      message: res.msg,
    });
  }
};

// 立即购买
const store = useOrderProductStore();
const handleBuy = () => {
  router.push({
    path: "/writeOrder",
    query: {
      type: "product",
    },
  });
  const product: GetCartListData = {
    name: goodsData.value!.name,
    image: goodsData.value!.image,
    userId: 0,
    price: goodsData.value!.price,
    productId: id,
    quantity: 1,
    checked: "0",
  };
  store.$patch((state) => {
    state.list = [product];
  });
};
</script>

<style lang="less" scoped>
.goods-detail {
  background-color: #f2f2f2;
  min-height: 100vh;
  .goods-info {
    margin-top: 10px;
    border-radius: 20px;
    background-color: #fff;
    padding: 20px 10px;
    .price {
      margin-bottom: 10px;
      .num {
        color: red;
        font-size: 28px;
      }
    }
    .title {
      font-size: 16px;
      font-weight: 500;
      color: #000;
      margin-bottom: 10px;
    }
    .case {
      span {
        color: #888888;
      }
      .sales {
        margin-left: 15px;
      }
    }
  }
}
</style>
