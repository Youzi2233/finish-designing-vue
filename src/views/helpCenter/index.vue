<template>
  <div class="help-center">
    <div class="header">
      <van-icon
        @click="router.replace('/personalPage')"
        class="icon"
        name="arrow-left"
      />
      <h3 class="title">帮助中心</h3>
    </div>
    <!-- 帮助列表 -->
    <div class="help-list">
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item v-for="item in helpList" :title="item.problem">
          {{ item.answer }}
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { getHelpList } from "./api/index";
import type { HelpListData } from "./api/index";
import { ref } from "vue";

const router = useRouter();

const helpList = ref<HelpListData[]>([]);
getHelpList().then((res) => {
  helpList.value = res.data.list;
});

const activeNames = ref(0);
</script>

<style lang="less" scoped>
.help-center {
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
  .help-list {
    margin-top: 15px;
  }
}
</style>
