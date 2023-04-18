<template>
  <div class="product-manage">
    <!-- 操作栏 -->
    <actionBarManage
      :add-show="false"
      :search-show="false"
      :select-list="[]"
      :delete-show="false"
      placeholder="通过名称模糊搜索"
      @refresh="handleRefresh"
      @search="handleSearch"
    />
    <!-- 表单 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column prop="id" label="id" />
        <el-table-column prop="userId" label="userId" />
        <el-table-column prop="status" label="status" />
        <el-table-column prop="updateTime" label="updateTime" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button
              @click="handleEdit(scope.row)"
              type="primary"
              size="small"
            >
              <el-icon><Edit /></el-icon>
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
        @current-change="handleChangePage"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>
  <!-- 对话框 -->
  <el-dialog width="500px" v-model="dialogFormVisible" title="编辑申请">
    <el-form :model="form">
      <el-form-item label="申请编号" :label-width="formLabelWidth">
        <el-input disabled v-model="form.upgradeId" autocomplete="off" />
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
          @click="form.status = form.labelForStatus ? 'T' : 'F'"
          v-model="form.labelForStatus"
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
import type { ApplicationData } from "./api/index";
import { getApplicationList, modifyStatus } from "./api/index";
import { ref } from "vue";
import { Edit, Loading } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { ElMessage } from "element-plus";

/**
 * 操作栏事件
 */

//搜索
const handleSearch = (value: string) => {
  console.log(value);
};
/**
 * 表单
 */
const tableData = ref<ApplicationData[]>([]);

// 对话框
const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const form = reactive({
  upgradeId: 0,
  status: "F",
  labelForStatus: false,
});
const handleEdit = (item: ApplicationData) => {
  dialogFormVisible.value = true;
  form.upgradeId = item.id;
  form.status = item.status;
  form.labelForStatus = form.status === "T" ? true : false;
};

const handleSubmit = async () => {
  const res = await modifyStatus(form);
  if (res.msg.toLowerCase() === "success") {
    ElMessage({
      type: "success",
      message: "编辑成功",
      duration: 1000,
    });
  }
  dialogFormVisible.value = false;
  requestFn();
};

// 刷新
const isRefresh = ref(false);
const handleRefresh = async () => {
  isRefresh.value = true;
  tableData.value = [];
  await requestFn();
  isRefresh.value = false;
};
// 分页
const total = ref(0);
const pageNum = ref(1);
const handleChangePage = (page: number) => {
  console.log(page);
  pageNum.value = page;
};

// 请求数据
const requestFn = async () => {
  const res = await getApplicationList({
    pageNum: pageNum.value,
    pageSize: 10,
  });
  tableData.value = res.data.list;
  total.value = res.data.total;
};
requestFn();
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
