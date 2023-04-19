<template>
  <div class="product-card">
    <img class="cover" :src="img" alt="" />
    <div class="info">
      <van-text-ellipsis class="title" :content="productName" />
      <div class="price-box">
        <div class="price-show">
          <span
            >¥<span class="prefix">{{ totalPrice.prefix }}</span
            >.<span>{{ totalPrice.surfix }}</span>
          </span>
        </div>
        <span>库存：{{ stock }} &nbsp; 销量：{{ sales }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { moneyFormat } from "@/hook/index";
type Prop = {
  img: string;
  productName: string;
  price: number;
  stock: number;
  sales: number;
};
const props = defineProps<Prop>();

const totalPrice = moneyFormat(props.price);
</script>

<style lang="less" scoped>
.product-card {
  display: flex;
  background-color: #fff;
  .cover {
    width: 20vw;
    height: 20vw;
  }
  .info {
    padding-left: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      color: #000;
    }
    .price-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #000;
      font-size: 12px;
      .price-show {
        color: #000;
        font-weight: 500;
        .prefix {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
