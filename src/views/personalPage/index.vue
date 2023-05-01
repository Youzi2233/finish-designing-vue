<template>
  <div class="personal-page">
    <!-- 用户信息卡片 -->
    <UserCard
      :gender="user.gender"
      :nick-name="user.nickname"
      :signature="user.signature"
    />
    <!-- 待付款 待收货 我的订单 -->
    <orderCard style="margin-top: 10px" />
    <!-- 我的小店 -->
    <myShopCard style="margin-top: 10px" />
    <!-- 商品推荐列表 -->
    <div>
      <div class="goods-list" v-if="goodsList">
        <goodsCard
          v-for="item in goodsList"
          :id="item.id"
          :cover="item.image"
          :goods-name="item.name"
          :price="item.price"
        />
      </div>
      <!-- 无限加载组件 -->
      <infiniteLoading
        :loading="loading"
        :finished="finished"
        @infinite="getData"
      />
    </div>
    <!-- 设置按钮 -->
    <van-icon
      v-if="user.id != 0"
      @click="router.push('/setting')"
      class="settingIcon"
      name="setting-o"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UserCard from "./components/UserCard.vue";
import orderCard from "./components/orderCard.vue";
import goodsCard from "@/components/goodsCard.vue";
import myShopCard from "./components/myShopCard.vue";
import infiniteLoading from "@/components/infinite-loading.vue";
import { useRouter } from "vue-router";
import { useUserInfoStore } from "@/store";
import { getRecommendList } from "@/views/index/api/index";
import type { GoodsData } from "./api/index";

const router = useRouter();
const user = useUserInfoStore();

const goodsList = ref<GoodsData[]>([]);

const pageNum = ref(0);

// 加载中
const loading = ref(false);
// 是否加载完毕
const finished = ref(false);
const getData = async () => {
  pageNum.value = pageNum.value + 1;
  loading.value = true;
  try {
    const res = await getRecommendList({
      pageNum: pageNum.value,
      pageSize: 10,
    });
    // 获取数据成功
    if (res.data.list.length) {
      // 有数据就追加数据
      goodsList.value.push(...res.data.list);
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
</script>

<style lang="less" scoped>
.personal-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .settingIcon {
    position: absolute;
    top: 0;
    right: 3vw;
    font-size: 24px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>
