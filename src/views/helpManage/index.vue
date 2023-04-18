<template>
  <div class="product-manage">
    <!-- 操作栏 -->
    <actionBarManage
      :search-show="false"
      @add="handleAdd"
      @delete="handleBatchDelete"
      :select-list="selectList"
      placeholder="通过名称模糊搜索"
      @refresh="handleRefresh"
    />
    <!-- 表单 -->
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column prop="helpId" label="helpId" />
        <el-table-column prop="problem" label="问题" />
        <el-table-column prop="answer" label="回答" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button
              @click="handleEdit(scope.row)"
              type="primary"
              size="small"
            >
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button
              @click="handleDelete(scope.row)"
              type="danger"
              size="small"
            >
              <el-icon><Delete /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 刷新遮罩层 -->
      <div class="refresh" v-show="isRefresh">
        <div class="icon">
          <el-icon><Loading /></el-icon>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="footer">
      <el-pagination
        v-model:current-page="pageNum"
        @current-change="handleChangePage"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>
  <!-- 对话框 -->
  <el-dialog width="50%" v-model="dialogFormVisible" :title="title">
    <el-form :model="form">
      <el-form-item v-if="form.helpId > 0" label="编号">
        <el-input disabled v-model="form.helpId" />
      </el-form-item>
      <el-form-item label="问题">
        <el-input v-model="form.problem" placeholder="请输入问题" />
      </el-form-item>
      <el-form-item label="回答">
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.answer"
          placeholder="请输入回答"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import actionBarManage from "@/components/actionBar-manage.vue";
import type { HelpListData } from "./api/index";
import { getHelpList, addHelp, deleteHelp, editHelp } from "./api/index";
import { ref } from "vue";
import { Delete, Edit, Loading } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { ElMessage } from "element-plus";
// 分页
const total = ref(0);
const pageNum = ref(1);
const handleChangePage = async (page: number) => {
  const res = await getHelpList({
    pageNum: page,
    pageSize: 10,
  });
  tableData.value = res.data.list;
  total.value = res.data.total;
};

/**
 * 表单
 */
const tableData = ref<HelpListData[]>([]);
// 请求数据
const requestFn = async () => {
  const res = await getHelpList({ pageNum: pageNum.value });
  console.log(res.data);
  tableData.value = res.data.list;
};
requestFn();

// 单个删除
const handleDelete = async (item: HelpListData) => {
  await deleteHelp({ helpId: item.helpId });
  handleRefresh();
};
// 单个编辑
const handleEdit = async (item: HelpListData) => {
  dialogFormVisible.value = true;
  title.value = "编辑帮助";
  form.helpId = item.helpId;
  form.problem = item.problem;
  form.answer = item.answer;
};

/**
 * 操作栏事件
 */
const selectList = ref<HelpListData[]>([]);
const handleSelectionChange = (val: HelpListData[]) => {
  selectList.value = val;
  console.log(selectList.value);
};
// 刷新
const isRefresh = ref(false);
const handleRefresh = async () => {
  isRefresh.value = true;
  tableData.value = [];
  await requestFn();
  isRefresh.value = false;
};
// 添加
const handleAdd = async () => {
  form.helpId = -1;
  form.problem = "";
  form.answer = "";
  dialogFormVisible.value = true;
  title.value = "添加帮助";
};
// 批量删除
const handleBatchDelete = async () => {
  for (let i = 0; i < selectList.value.length; i++) {
    await deleteHelp({ helpId: selectList.value[i].helpId });
  }
  handleRefresh();
};

/**
 * 对话框
 */
const title = ref("");
const dialogFormVisible = ref(false);
const form = reactive({
  helpId: -1,
  problem: "",
  answer: "",
});

// 提交
const handleSubmit = async () => {
  // 添加
  if (form.helpId < 0) {
    const res = await addHelp(form);
    if (res.msg.toLowerCase() === "success") {
      ElMessage({
        type: "success",
        message: "添加成功",
        duration: 1000,
      });
      dialogFormVisible.value = false;
      requestFn();
    } else {
      ElMessage({
        type: "warning",
        message: res.msg,
        duration: 1000,
      });
    }
    return;
  }
  // 编辑
  const res = await editHelp(form);
  if (res.msg.toLowerCase() === "success") {
    ElMessage({
      type: "success",
      message: "编辑成功",
      duration: 1000,
    });
    dialogFormVisible.value = false;
    requestFn();
  } else {
    ElMessage({
      type: "warning",
      message: res.msg,
      duration: 1000,
    });
  }
};
</script>

<style lang="less" scoped>
.product-manage {
  height: 830px;
  background-color: #fff;
  position: relative;
  overflow: scroll;
  .table {
    padding: 15px;
    position: relative;
    .refresh {
      position: absolute;
      height: 100%;
      width: 100%;
      bottom: 0;
      background-color: #ffffff9a;
      color: #409eff;
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      .icon {
        animation: fadenum 4s infinite;
      }
      @keyframes fadenum {
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
  .footer {
    padding: 15px;
    display: flex;
    width: 100%;
    justify-content: center;
    position: absolute;
    bottom: 0;
  }
}
</style>
