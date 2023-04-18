<template>
  <div id="app">
    <router-view></router-view>
    <van-back-top :offset="300" right="10px" bottom="60px" />
  </div>
</template>

<script setup lang="ts"></script>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
