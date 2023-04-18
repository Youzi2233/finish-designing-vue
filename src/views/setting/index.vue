<template>
  <div class="setting">
    <div class="header">
      <van-icon
        @click="router.replace('/personalPage')"
        class="icon"
        name="arrow-left"
      />
      <h3 class="title">账户设置</h3>
    </div>
    <div class="cell-list">
      <van-cell title="地址管理" is-link to="addressManage" />
      <van-cell title="修改个人信息" is-link to="changeUserInfo" />
      <van-cell title="修改密码" is-link to="resizePassword" />
    </div>
    <div class="loginOut">
      <van-button
        style="width: 200px"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        round
        @click="handleLoginOut"
      >
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { loginOutFn } from "./api/index";
import { useUserInfoStore } from "@/store";
import { showSuccessToast, showFailToast } from "vant";
const router = useRouter();
const user = useUserInfoStore();

const handleLoginOut = async () => {
  const res = await loginOutFn();
  if (res.msg.toLowerCase() === "success") {
    showSuccessToast({
      duration: 1000,
      message: "退出成功",
    });
    // 清空用户信息
    user.resizeState();
    // 跳转
    router.push("/personalPage");
  } else {
    showFailToast({
      duration: 1000,
      message: res.msg,
    });
  }
};
</script>

<style lang="less" scoped>
.setting {
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
  .loginOut {
    width: 100%;
    display: flex;
    margin-top: 20px;
    justify-content: center;
  }
}
</style>
