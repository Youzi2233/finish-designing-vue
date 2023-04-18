<template>
  <div class="login">
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
          登录
        </van-button>
      </div>
    </van-form>
    <div class="toRegister">
      <router-link to="/register">新用户注册</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/imgs/vite.svg";
import { baseURL } from "@/utils/request";
import { ref } from "vue";
import { loginFn } from "./api/index";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { showSuccessToast, showFailToast } from "vant";
import { useUserInfoStore } from "@/store/index";

type SubmitObj = {
  userName: string;
  password: string;
  tPassword: string;
  vc: string;
};

const userName = ref("");
const password = ref("");
const verify = ref("");

const route = useRoute();
userName.value = route.query.userName as string;
password.value = route.query.password as string;

const vcUrl = ref(baseURL + "/verify_code" + "?t=" + new Date().getTime());

// 点击切换验证码
const changeVc = () => {
  vcUrl.value = baseURL + "/verify_code" + "?t=" + new Date().getTime();
};

const loading = ref(false);
const router = useRouter();
const store = useUserInfoStore();
// 提交
const onSubmit = async (values: SubmitObj) => {
  loading.value = true;
  const { userName, password, vc } = values;
  const res = await loginFn({ userName, password, vc });
  loading.value = false;

  if (res.msg.toLowerCase() === "success") {
    showSuccessToast({
      duration: 1000,
      message: "登录成功",
    });
    store.$patch({
      ...res.data,
    });
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
.login {
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
