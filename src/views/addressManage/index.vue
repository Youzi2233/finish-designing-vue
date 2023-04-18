<template>
  <div class="address-manage">
    <div class="header">
      <van-icon @click="router.back()" class="icon" name="arrow-left" />
      <h3 class="title">地址管理</h3>
    </div>
    <!-- 地址列表 -->
    <div class="address-list">
      <van-address-list
        :switchable="switchAble"
        v-model="chosenAddressId"
        :list="list"
        @select="handleSelect"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
      <van-empty v-if="list.length < 1" description="暂无地址，请先添加地址" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { AddressListAddress } from "vant";
import { useRoute, useRouter } from "vue-router";
import { getAddressList } from "./api/index";
import { useOrderProductStore } from "@/store/index";
import type { OrderAddress } from "@/store/index";

const router = useRouter();

const chosenAddressId = ref(0);
interface ListItem extends AddressListAddress {
  isDefault: boolean;
  address: string;
}
const list = ref<ListItem[]>([]);

getAddressList().then((res) => {
  res.data.forEach((item) => {
    const listItem = {
      ...item,
      id: item.addressId,
      isDefault: item.isDefault === "1" ? true : false,
      address:
        item.province + item.city + item.district + " " + item.userAddress,
    };
    list.value.push(listItem);
  });
});

// 新增地址
const onAdd = () => {
  router.push("/addressEdit");
};
// 编辑
const onEdit = (item: AddressListAddress, index: number) => {
  router.push({
    path: "/addressEdit",
    query: {
      id: item.id,
    },
  });
};

// 地址切换
const switchAble = ref(false);
const route = useRoute();
if (route.query.addressId) {
  switchAble.value = true;
}
chosenAddressId.value = Number(route.query.addressId);
const store = useOrderProductStore();
const handleSelect = (item: OrderAddress, index: number) => {
  console.log(item, index);
  store.$patch((state) => {
    state.orderAddress = item;
  });
  router.replace("/writeOrder");
};
</script>

<style lang="less" scoped>
.address-manage {
  position: relative;
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
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    padding: 5vw;
  }
}
</style>
