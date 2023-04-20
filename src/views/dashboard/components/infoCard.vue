<template>
  <div class="info-card">
    <!-- 标题 -->
    <h3 class="title">{{ title }}</h3>
    <!-- 图标 数量 -->
    <div class="icon-box">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#icon-${iconName}`"></use>
      </svg>
      <span class="num">{{ toThousands(num) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toThousands } from "@/hook/index";
type Prop = {
  title: string;
  iconName: string;
  num: number;
};
defineProps<Prop>();
console.log(toThousands(1000));
</script>

<style lang="less" scoped>
.info-card {
  padding: 15px;
  background-color: #e9edf2;
  width: 300px;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 14px 24px #0003;
  }
  .title {
    color: #989ca0;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .icon-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      font-size: 24px;
    }
    .num {
      font-size: 28px;
    }
  }
}
</style>
