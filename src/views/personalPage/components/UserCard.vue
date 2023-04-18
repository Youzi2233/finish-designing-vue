<template>
  <div class="user-card">
    <!-- 头像 -->
    <img class="userImg" :src="user" alt="" />
    <!-- 昵称 -->
    <p v-if="nickName" class="name">
      <gender :gender="props.gender" />{{ nickName }}
    </p>
    <p v-if="!nickName" @click="router.push('/login')" class="toLogin">
      登录/注册
    </p>
    <!-- 签名 -->
    <div v-if="nickName" class="signature">
      <p>
        {{
          signature == "" || signature == null
            ? "这个人很懒，没有留下任何签名"
            : signature
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import user from "@/assets/imgs/user.png";
import gender from "./gender.vue";
import { useRouter } from "vue-router";
type Prop = {
  nickName: string | null;
  signature: string | null;
  gender: string;
};
const props = defineProps<Prop>();

const router = useRouter();
</script>

<style lang="less" scoped>
.user-card {
  width: 95vw;
  border-radius: 20px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .userImg {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    border: 1px solid #b686862c;
  }
  .name {
    font-size: 18px;
    font-weight: 500;
    color: #000;
    margin: 10px;
  }
  .toLogin {
    font-size: 18px;
    margin: 10px;
    color: #1989fa;
    cursor: pointer;
  }
  .signature {
    border-radius: 10px;
    width: 200px;
    text-align: center;
    p {
      color: #969799;
    }
  }
}
</style>
