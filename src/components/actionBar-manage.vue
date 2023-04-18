<template>
  <div class="actionBar-manage">
    <!-- 按钮栏 -->
    <div class="btn-list">
      <el-button v-if="refreshShow" @click="handleRefresh" color="#40485b">
        <el-icon><Refresh /></el-icon>
      </el-button>
      <el-button v-if="addShow" @click="handleAdd" type="primary">
        <el-icon style="margin-right: 5px"><Plus /></el-icon>
        添加
      </el-button>
      <el-button
        v-if="deleteShow"
        @click="handleDelete"
        type="danger"
        :disabled="selectList.length === 0"
      >
        <el-icon style="margin-right: 5px"><Delete /></el-icon>
        删除
      </el-button>
    </div>
    <!-- 搜索框 -->
    <div class="searchInput">
      <el-input
        v-if="searchShow"
        @keyup.enter="handleSearch"
        v-model="search"
        :placeholder="placeholder"
      >
        <template #append>
          <el-button @click="handleSearch" :icon="Search" />
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Refresh, Edit, Delete, Search } from "@element-plus/icons-vue";
import { ref } from "vue";
type Prop = {
  refreshShow?: boolean;
  selectList: unknown[]; //表单选中项目集合
  placeholder: string;
  searchShow?: boolean;
  deleteShow?: boolean;
  addShow?: boolean;
};
const props = withDefaults(defineProps<Prop>(), {
  addShow: true,
  searchShow: true,
  deleteShow: true,
  refreshShow: true,
});
const emit = defineEmits(["refresh", "add", "delete", "search"]);
const search = ref("");

const handleRefresh = () => {
  emit("refresh");
};
const handleAdd = () => {
  emit("add");
};
const handleDelete = () => {
  emit("delete", props.selectList);
};
const handleSearch = () => {
  emit("search", search.value);
};
</script>

<style lang="less" scoped>
.actionBar-manage {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f5f5f5;
  .searchInput {
    width: 240px;
  }
}
</style>
