<template>
  <div class="management-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="activeMenu" class="el-menu-vertical-demo">
          <!-- title -->
          <div class="header-box">
            <div class="title">商城管理系统</div>
          </div>
          <el-menu-item index="1" @click="router.push('/managementIndex')">
            <el-icon><icon-menu /></el-icon>
            <template #title>控制台</template>
          </el-menu-item>
          <el-menu-item
            index="2"
            @click="router.push('/managementIndex/helpManage')"
          >
            <el-icon><HelpFilled /></el-icon>
            <template #title>帮助管理</template>
          </el-menu-item>
          <el-menu-item
            index="3"
            @click="router.push('/managementIndex/applicationManage')"
          >
            <el-icon><Management /></el-icon>
            <template #title>店主申请管理</template>
          </el-menu-item>
          <el-menu-item
            index="4"
            @click="router.push('/managementIndex/sliderManage')"
          >
            <el-icon><List /></el-icon>
            <template #title>轮播图管理</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header">
            <!-- 面包屑 -->
            <div class="bread"></div>
            <!-- 用户模块 -->
            <div class="admin-user">
              <el-dropdown trigger="click">
                <div class="user">
                  <img class="avatar" :src="avatar" alt="" />
                  <span>{{ adminStore.adminName }}</span>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="handleLoginOut">
                      注销
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main class="management-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Menu as IconMenu,
  HelpFilled,
  Management,
  List,
} from "@element-plus/icons-vue";
import { useAdminStore } from "@/store/admin";
import avatar from "@/assets/imgs/avatar.png";
import { loginOutFn } from "@/views/management/api/index";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";

const adminStore = useAdminStore();
const router = useRouter();
const route = useRoute();
const activeMenu = ref((route.meta.index as string) ?? "1");

const handleLoginOut = async () => {
  const res = await loginOutFn();
  if (res.msg.toLowerCase() === "success") {
    ElMessage({
      type: "success",
      message: "注销成功",
      duration: 1000,
    });
    adminStore.resizeState();
    router.replace("/management");
  }
};
</script>

<style lang="less" scoped>
.management-layout {
  width: 100vw;
  height: 100vh;
  background-color: #f3f3f3;
  .el-menu-vertical-demo {
    min-height: 100vh;
  }
  .header-box {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    height: 68px;
    color: #409eff;
    .title {
      font-size: 20px;
      font-weight: 600;
    }
  }
  :deep(.el-header) {
    padding: 0;
    height: 50px;
  }
  .header {
    background-color: #fff;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .admin-user {
      .user {
        padding: 0 10px;
        height: 50px;
        font-size: 16px;
        display: flex;
        align-items: center;
        color: #000;
        user-select: none;
        cursor: pointer;
        &:hover {
          background-color: #f3f3f3;
        }
        .avatar {
          width: 25px;
          height: 25px;
          border-radius: 25px;
          margin-right: 5px;
        }
      }
    }
  }
  .management-main {
    height: 869px;
    overflow: scroll;
  }
}
</style>
