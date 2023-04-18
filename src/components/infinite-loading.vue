<template>
  <div class="infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished && !loading">
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
type Prop = {
  loading: boolean;
  finished: boolean;
};
const props = withDefaults(defineProps<Prop>(), {
  loading: false,
  finished: false,
});

const emit = defineEmits(["infinite"]);
const target = ref(null);
//   监听target是否进入可视区
useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      //   触发加载事件条件： 请求loading完成，数据加载完毕
      if (!props.loading && !props.finished) {
        emit("infinite");
      }
    }
  },
  { threshold: 0 }
);
</script>

<style scoped lang="less">
.infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    .img {
      width: 20px;
      height: 20px;
      background: url(../assets/imgs/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
