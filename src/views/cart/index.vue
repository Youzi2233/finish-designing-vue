<template>
  <div class="cart">
    <div class="cart-goodsList" v-if="cartList?.length">
      <cartGoodsCard
        :show-checked="true"
        v-for="item in cartList"
        @delete="requestGetCartList()"
        :goods="item"
        v-model="item.quantity"
        @selected="handleSelected"
      />
    </div>
    <van-empty v-else description="购物车暂无商品" />
    <!-- 结算栏 -->
    <van-submit-bar
      :safe-area-inset-bottom="false"
      :price="totalPrice"
      button-text="去结算"
      @submit="onSubmit"
    >
      <van-checkbox @click="handleChecked" v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import cartGoodsCard from "@/components/cartGoodsCard.vue";
import { useRoute, useRouter } from "vue-router";
import { getCartList } from "./api/index";
import type { GetCartListData } from "./api/index";
import { useOrderProductStore } from "@/store/index";

const route = useRoute();
const router = useRouter();

const cartList = ref<GetCartListData[]>([]);
const requestGetCartList = async () => {
  const res = await getCartList();
  cartList.value = res.data.list;
};
requestGetCartList();

// 选中项
const selectedList = computed(() => {
  return cartList.value?.filter((item) => item.checked !== "0") ?? [];
});
// 所选择的合计价格
const totalPrice = computed(() => {
  let total = 0;
  selectedList.value.forEach((item) => {
    total += item.price * item.quantity ?? 0;
  });
  return total * 100;
});
const handleSelected = (checked: boolean, selectedItem: GetCartListData) => {
  cartList.value?.forEach((item) => {
    if (item.id === selectedItem.id) {
      item.checked = checked ? "1" : "0";
    }
  });
};

// 全选
const checked = ref(false);
watch(
  cartList,
  () => {
    // 只要有一个为未选，全选就为false
    checked.value = !cartList.value.some((item) => item.checked === "0");
  },
  { immediate: true, deep: true }
);

// 点击全选
const handleChecked = () => {
  cartList.value?.forEach((item) => {
    item.checked = checked.value ? "1" : "0";
  });
};

// 结算
const store = useOrderProductStore();
const onSubmit = () => {
  router.push({
    path: "/writeOrder",
    query: {
      type: "cart",
    },
  });
  store.$patch((state) => {
    state.list = selectedList.value;
  });
};

// 根据路径修改结算栏距底部距离
const bottom = ref("50px");
if (route.fullPath === "/cart") {
  bottom.value = "50px";
} else {
  bottom.value = "0px";
}
</script>

<style lang="less" scoped>
.cart {
  position: relative;
  background-color: #f2f2f2;
  min-height: 100vh;
  :deep(.van-submit-bar) {
    bottom: v-bind(bottom);
  }
}
</style>
