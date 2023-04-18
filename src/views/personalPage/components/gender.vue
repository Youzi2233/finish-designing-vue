<template>
  <svg v-if="gender == '男'" class="icon" aria-hidden="true">
    <use xlink:href="#icon-xingbienan"></use>
  </svg>
  <svg v-else-if="gender == '女'" class="icon" aria-hidden="true">
    <use xlink:href="#icon-xingbienv"></use>
  </svg>
</template>

<script setup lang="ts">
type Prop = {
  gender: string;
};
defineProps<Prop>();
</script>

<style></style>
