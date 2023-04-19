<template>
  <div class="shop-card">
    <!-- 标题 -->
    <h3 class="title">我的小店</h3>
    <!-- 列表 -->
    <div class="card-list">
      <div class="card" v-for="item in data" @click="handleClick(item.to)">
        <van-icon :color="item.color" class="icon" :name="item.iconName" />
        <span class="name">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const data = [
  {
    title: "我发布的",
    iconName: "bag",
    color: "#1989fa",
    to: "productPublish",
  },
  {
    title: "我卖出的",
    iconName: "gold-coin",
    color: "#ee0a24",
    to: "productSell",
  },
];
const router = useRouter();
const handleClick = (to: string) => {
  router.push(to);
};
</script>

<style lang="less" scoped>
.shop-card {
  width: 95vw;
  border-radius: 10px;
  padding: 10px;
  background-color: #fff;
  .title {
    color: #000;
    font-size: 15px;
    font-weight: 600;
  }
  .card-list {
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
      .name {
        color: #000;
        margin: 5px;
      }
    }
  }
}
</style>
