<template>
  <div class="order">
    <div class="header">
      <van-icon @click="router.back()" class="icon" name="arrow-left" />
      <h3 class="title">我发布的</h3>
    </div>
    <!-- 操作栏 -->
    <div class="btn-list">
      <van-button
        @click="router.push('/publish')"
        size="small"
        round
        type="danger"
      >
        发布商品
      </van-button>
    </div>
    <!-- 商品列表 -->
    <div class="product-list" v-if="MyGoodsList.length">
      <div class="card" v-for="item in MyGoodsList">
        <!-- 订单 -->
        <ProductCard
          :product-name="item.name"
          :img="item.image"
          :price="item.price"
          :stock="item.stock"
          :sales="item.sales"
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
            删除商品
          </van-button>
          <van-button
            @click="handleAction(1, item)"
            class="btn"
            size="small"
            plain
            round
            type="primary"
          >
            编辑
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
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import ProductCard from "./components/ProductCard.vue";
import type { MyGoodsData } from "./api/index";
import { getMyGoodsList, deleteProduct } from "./api/index";
import { ref, watch } from "vue";
import infiniteLoading from "@/components/infinite-loading.vue";
import { showSuccessToast } from "vant";
import { usePayProductStore, useUserInfoStore } from "@/store";

const router = useRouter();
const route = useRoute();
const userStore = useUserInfoStore();

// 获取我的商品列表
const MyGoodsList = ref<MyGoodsData[]>([]);
const pageNum = ref(0);

// 加载中
const loading = ref(false);
// 是否加载完毕
const finished = ref(false);
const getData = async () => {
  pageNum.value = pageNum.value + 1;
  loading.value = true;
  try {
    const res = await getMyGoodsList({
      shopId: userStore.id,
      pageNum: pageNum.value,
      pageSize: 10,
    });
    // 获取数据成功
    if (res.data.list.length) {
      // 有数据就追加数据
      MyGoodsList.value.push(...res.data.list);
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

const handleAction = async (action: number, item: MyGoodsData) => {
  switch (action) {
    // 删除商品
    case 0:
      const res = await deleteProduct({ id: item.id });
      if (res.msg.toLowerCase() == "success") {
        router.back();
        showSuccessToast({
          message: "删除成功",
          duration: 1000,
        });
      }
      break;
    // 编辑
    case 1:
      router.push({
        path: "/edit",
        query: {
          id: item.id,
        },
      });
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
  .btn-list {
    background-color: #fff;
    padding: 10px;
    display: flex;
    justify-content: end;
  }
  .product-list {
    margin-top: 10px;
    .card {
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
