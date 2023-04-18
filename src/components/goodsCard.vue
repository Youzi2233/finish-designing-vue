<template>
  <div class="goods-card" @click="handleClick">
    <!-- 封面 -->
    <van-image width="48vw" height="48vw" lazy-load :src="cover" />
    <!-- 商品名称 -->
    <h3 class="title">{{ goodsName }}</h3>
    <!-- 价格 -->
    <div>
      <span class="price">{{ `¥${price}` }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
type Prop = {
  id: number;
  cover: string;
  goodsName: string;
  price: number;
};

const props = defineProps<Prop>();
const router = useRouter();

const handleClick = () => {
  router.push(`/goodsDetail/${props.id}`);
};
</script>

<style lang="less" scoped>
.goods-card {
  display: flex;
  width: 48vw;
  margin: 0 1vw;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 10px;
  .title {
    padding: 0 5px;
    margin: 5px 0;
    font-size: 15px;
    color: #000;
    font-weight: 500;
    overflow: hidden;
    word-break: break-all;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    display: inline-block;
    color: red;
    font-size: 18px;
    margin-left: 5px;
    margin-bottom: 5px;
  }
}
</style>
