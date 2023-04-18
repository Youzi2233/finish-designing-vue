<template>
  <div class="change-userInfo">
    <div class="header">
      <van-icon @click="router.back()" class="icon" name="arrow-left" />
      <h3 class="title">修改个人信息</h3>
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="signature"
          rows="2"
          autosize
          type="textarea"
          maxlength="200"
          show-word-limit
          name="signature"
          label="个性签名"
          placeholder="请输入个性签名"
        />
        <van-field name="gender" label="性别">
          <template #input>
            <van-radio-group v-model="gender" direction="horizontal">
              <van-radio name="保密">保密</van-radio>
              <van-radio name="男">男</van-radio>
              <van-radio name="女">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserInfoStore } from "@/store";
import { changeInfo } from "./api/index";
import type { Data } from "./api/index";
import { showFailToast, showSuccessToast } from "vant";
const router = useRouter();
const user = useUserInfoStore();

const signature = ref<string>("");
const gender = ref("保密");

signature.value = user.signature ?? "";
gender.value = user.gender;

const onSubmit = async (userInfo: Data) => {
  const res = await changeInfo(userInfo);
  if (res.msg.toLowerCase() === "success") {
    // 修改本地
    user.$patch((state) => {
      state.signature = userInfo.signature;
      state.gender = userInfo.gender;
    });

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
.change-userInfo {
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
