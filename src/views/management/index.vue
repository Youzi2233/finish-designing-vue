<template>
  <div class="container">
    <div class="login">
      <h1>商城管理系统</h1>
      <el-form :model="form">
        <el-form-item>
          <el-input
            :prefix-icon="Avatar"
            size="large"
            v-model="form.userName"
            placeholder="用户名"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            :prefix-icon="Promotion"
            size="large"
            show-password
            v-model="form.password"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            :prefix-icon="InfoFilled"
            size="large"
            v-model="form.vc"
            placeholder="验证码"
          >
            <template #append>
              <img style="height: 50px" @click="changeVc" :src="vcUrl" alt="" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="isLoading"
            size="large"
            type="primary"
            @click="onSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { Avatar, Promotion, InfoFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { baseURL } from "@/utils/request";
import { loginFn } from "./api/index";
import { ElMessage } from "element-plus";
import { useAdminStore } from "@/store/admin";

// 表单
const form = reactive({
  userName: "",
  password: "",
  vc: "",
});

const isLoading = ref(false);
const router = useRouter();
// 验证码
const vcUrl = ref(baseURL + "/verify_code" + "?t=" + new Date().getTime());
// 点击切换验证码
const changeVc = () => {
  vcUrl.value = baseURL + "/verify_code" + "?t=" + new Date().getTime();
};

const adminStore = useAdminStore();
// 登录
const onSubmit = async () => {
  if (!form.userName || !form.password) {
    return;
  }
  isLoading.value = true;
  const res = await loginFn(form);
  if (res.msg.toLowerCase() === "success") {
    ElMessage({
      message: "登录成功",
      type: "success",
      duration: 1000,
    });
    adminStore.$patch((state) => {
      state.id = res.data.id;
      state.adminName = res.data.adminName;
    });
    router.push("/managementIndex");
  } else {
    ElMessage({
      message: res.msg,
      type: "warning",
      duration: 1000,
    });
  }
  isLoading.value = false;
};
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2d3a4b;
  .login {
    text-align: center;
    padding: 30px 50px;
    background-color: #2d333c;
    border-radius: 10px;
    h1 {
      color: #eee;
      font-size: 24px;
      margin-bottom: 40px;
    }
    .el-input--large {
      height: 50px;
      font-size: 18px;
    }
    .el-button--large {
      height: 50px;
      width: 100%;
    }
    .el-input__wrapper {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .el-button + .el-button {
      margin-left: 0;
    }
    :deep(.el-input-group__append) {
      padding: 0;
    }
  }
}
</style>
