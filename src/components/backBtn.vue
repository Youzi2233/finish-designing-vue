<template>
  <div class="toBack-btn" @click.stop="router.back()">
    <van-icon name="arrow-left" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style lang="less" scoped>
.toBack-btn {
  position: absolute;
  width: 10vw;
  height: 10vw;
  background-color: #0000005b;
  top: 3vw;
  left: 3vw;
  z-index: 999;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10vw;
  font-size: 16px;
}
</style>
