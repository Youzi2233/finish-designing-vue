<template>
  <div class="register">
    <img class="logo" :src="logo" alt="" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="userName"
          name="userName"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="tPassword"
          type="password"
          name="tPassword"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ validator: validatorMessage }]"
        />
        <van-field
          v-model="verify"
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
        <van-button
          :loading="loading"
          round
          block
          type="primary"
          native-type="submit"
        >
          注册
        </van-button>
      </div>
    </van-form>
    <div class="toRegister">
      <router-link to="/login">已有账号？去登录</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/imgs/vite.svg";
import { ref } from "vue";
import { registerFn } from "./api/index";
import { baseURL } from "@/utils/request";
import { useRouter } from "vue-router";
import { showSuccessToast, showFailToast } from "vant";

type SubmitObj = {
  userName: string;
  password: string;
  tPassword: string;
  vc: string;
};

const userName = ref("");
const password = ref("");
const tPassword = ref("");
const verify = ref("");

const vcUrl = ref(baseURL + "/verify_code" + "?t=" + new Date().getTime());

// 点击切换验证码
const changeVc = () => {
  vcUrl.value = baseURL + "/verify_code" + "?t=" + new Date().getTime();
};

// 确认密码校验
const validatorMessage = (val: string) => {
  if (password.value !== val || password.value == "")
    return "两次密码需输入一致";
  else return true;
};

const loading = ref(false);
const router = useRouter();
// 提交
const onSubmit = async (values: SubmitObj) => {
  loading.value = true;
  const { userName, password, vc } = values;
  const res = await registerFn({ userName, password, vc });
  loading.value = false;
  if (res.msg.toLowerCase() === "success") {
    showSuccessToast({
      duration: 1000,
      message: "注册成功",
    });
    router.push({
      path: "/login",
      query: {
        userName,
        password,
      },
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
.register {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #d6f7ec;
  .logo {
    width: 80px;
    margin-bottom: 15px;
  }
}
</style>
