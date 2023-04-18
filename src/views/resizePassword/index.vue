<template>
  <div class="resize-password">
    <div class="header">
      <van-icon @click="router.back()" class="icon" name="arrow-left" />
      <h3 class="title">修改密码</h3>
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="oldPassword"
          type="password"
          show-word-limit
          name="oldPassword"
          label="旧密码"
          placeholder="请输入旧密码"
        />
        <van-field
          v-model="newPassword"
          type="password"
          show-word-limit
          name="newPassword"
          label="新密码"
          placeholder="请输入新密码"
        />
        <van-field
          v-model="vc"
          name="vc"
          label="验证码"
          placeholder="验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #button>
            <div style="width: 110px; height: 40px">
              <img @click="changeVc" :src="vcUrl" alt="" />
            </div>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          确定
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { Data } from "./api/index";
import { baseURL } from "@/utils/request";
import { changePassword } from "./api/index";
import { showFailToast, showSuccessToast } from "vant";
const router = useRouter();

const oldPassword = ref("");
const newPassword = ref("");
const vc = ref("");

const vcUrl = ref(baseURL + "/verify_code" + "?t=" + new Date().getTime());

// 点击切换验证码
const changeVc = () => {
  vcUrl.value = baseURL + "/verify_code" + "?t=" + new Date().getTime();
};

const onSubmit = async (form: Data) => {
  const res = await changePassword(form);
  if (res.msg.toLowerCase() === "success") {
    showSuccessToast({
      duration: 1000,
      message: "修改成功",
    });
  } else {
    showFailToast({
      duration: 1000,
      message: res.msg,
    });
  }
};
</script>

<style lang="less" scoped>
.resize-password {
  min-height: 100vh;
  background-color: #f2f2f2;
  .header {
    position: relative;
    background-color: #fff;
    margin-bottom: 10px;
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
}
</style>
