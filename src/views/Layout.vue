<template>
  <div class="layout">
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </div>
    <div class="footer">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="wap-home">首页</van-tabbar-item>
        <van-tabbar-item
          icon="shopping-cart"
          :badge="store.cartNum > 0 ? store.cartNum : undefined"
        >
          购物车
        </van-tabbar-item>
        <van-tabbar-item icon="manager">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserInfoStore } from "@/store/index";
const active = ref(0);
const router = useRouter();
const route = useRoute();

if (route.fullPath === "/personalPage") {
  active.value = 2;
} else if (route.fullPath === "/cart") {
  active.value = 1;
} else active.value = 0;

watch(active, () => {
  if (active.value === 0) router.push("/");
  if (active.value === 1) router.push("/cart");
  if (active.value === 2) router.push("/personalPage");
});

const store = useUserInfoStore();
store.getCartSum();
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
  background-color: #f2f2f2;
}
</style>
