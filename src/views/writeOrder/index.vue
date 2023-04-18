<template>
  <div class="write-order">
    <div class="header">
      <van-icon @click="router.back()" class="icon" name="arrow-left" />
      <h3 class="title">填写订单</h3>
    </div>
    <!-- 地址选择 -->
    <addressShow
      :addressId="userAddress.addressId"
      :prefixAddress="userAddress.prefixAddress"
      :name="userAddress.name"
      :tel="userAddress.tel"
      :isDefault="userAddress.isDefault"
      :detailAddress="userAddress.detailAddress"
      @click="handleAddressChoose"
    />
    <!-- 所选商品展示 -->
    <div class="product-show">
      <cartGoodsCard
        v-for="item in ProductList"
        :showChecked="false"
        v-model="item.quantity"
        :goods="item"
      />
    </div>
    <!-- action-bar -->
    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useOrderProductStore, usePayProductStore } from "@/store/index";
import addressShow from "@/components/address-show.vue";
import { getDefaultAddress, buyProduct, buyCart } from "./api/index";
import { reactive, ref, computed } from "vue";
import type { OrderAddress } from "@/store/index";
import cartGoodsCard from "@/components/cartGoodsCard.vue";
import type { GetCartListData } from "@/views/cart/api/index";

const router = useRouter();
const route = useRoute();
const store = useOrderProductStore();

const userAddress = reactive({
  addressId: 0,
  prefixAddress: "",
  detailAddress: "",
  name: "",
  tel: "",
  isDefault: false,
});

// 空对象
if (Object.getOwnPropertyNames(store.orderAddress).length === 0) {
  getDefaultAddress().then((res) => {
    userAddress.addressId = res.data.addressId;
    userAddress.name = res.data.name;
    userAddress.tel = res.data.tel;
    userAddress.detailAddress = res.data.userAddress;
    userAddress.prefixAddress =
      res.data.province + res.data.city + res.data.district;
    userAddress.isDefault = res.data.isDefault === "1" ? true : false;
  });
} else {
  const address = store.orderAddress as OrderAddress;
  userAddress.addressId = address.addressId;
  userAddress.name = address.name;
  userAddress.tel = address.tel as string;
  userAddress.isDefault = address.isDefault!;
  userAddress.detailAddress = address.userAddress;
  userAddress.prefixAddress =
    address.province + address.city + address.district;
}

const handleAddressChoose = () => {
  router.push({
    path: "/addressManage",
    query: {
      addressId: userAddress.addressId,
    },
  });
};

// 所选展示列表
const ProductList = ref<GetCartListData[]>([]);
ProductList.value = store.list;

// 所选择的合计价格
const totalPrice = computed(() => {
  let total = 0;
  ProductList.value.forEach((item) => {
    total += item.price * item.quantity ?? 0;
  });
  return total * 100;
});

const payStore = usePayProductStore();
// 提交订单
const onSubmit = async () => {
  if (route.query.type === "product") {
    const res = await buyProduct({
      productId: ProductList.value[0].productId,
      count: ProductList.value[0].quantity,
      address: userAddress.prefixAddress + " " + userAddress.detailAddress,
    });
    payStore.$patch((state) => {
      state.list = [{ ...res.data }];
    });
  } else {
    const res = await buyCart({
      address: userAddress.prefixAddress + " " + userAddress.detailAddress,
    });
    payStore.$patch((state) => {
      state.list = res.data;
    });
  }
  router.push("/pay");
};
</script>

<style lang="less" scoped>
.write-order {
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
  .product-show {
    margin-top: 10px;
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;
  }
}
</style>
