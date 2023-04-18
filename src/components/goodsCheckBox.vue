<template>
  <div class="goods-checked-box">
    <!-- -号按钮 -->
    <span @click.stop="handleClick(-1)">-</span>
    <!-- 显示区 -->
    <div class="show-area">{{ number }}</div>
    <!-- +号按钮 -->
    <span @click.stop="handleClick(1)">+</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useVModel } from "@vueuse/core";
type Prop = {
  modelValue: number;
};
const props = withDefaults(defineProps<Prop>(), {
  modelValue: 1,
});
const number = useVModel(props, "modelValue");
const emit = defineEmits(["numberChange"]);

const handleClick = (num: number) => {
  const result = number.value + num;
  if (result < 1) return;
  number.value = result;
};
watch(number, () => {
  emit("numberChange", number.value);
});
</script>

<style lang="less" scoped>
.goods-checked-box {
  display: flex;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50px;
  user-select: none;
  .show-area {
    width: 40px;
    height: 20px;
    text-align: center;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    font-size: 14px;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    color: #000;
    font-size: 14px;
  }
}
</style>
