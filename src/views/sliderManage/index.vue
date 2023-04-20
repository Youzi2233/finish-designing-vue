<template>
  <div class="slider-manage">
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
        <el-table-column prop="id" label="id" />
        <el-table-column prop="productId" label="商品编号" />
        <el-table-column label="商品封面">
          <template #default="scope">
            <div
              style="
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <img
                style="width: 100px; height: 100px"
                :src="scope.row.img"
                alt=""
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
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
  </div>
  <!-- 对话框 -->
  <el-dialog width="70%" v-model="dialogFormVisible" title="添加轮播图">
    <div class="dialog-add">
      <!-- 操作栏 -->
      <actionBarManage
        :add-show="false"
        :delete-show="false"
        :refresh-show="false"
        :select-list="[]"
        placeholder="通过标题模糊搜索"
        @search="handleSearch"
      />
      <!-- 商品表单 -->
      <div class="table">
        <el-table
          :data="tableGoodsData"
          style="width: 100%"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="id" label="商品编号" />
          <el-table-column label="商品封面">
            <template #default="scope">
              <div
                style="
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <img
                  style="width: 70px; height: 70px"
                  :src="scope.row.image"
                  alt=""
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" show-overflow-tooltip label="商品名称" />
          <el-table-column prop="price" label="商品价格" />
          <el-table-column prop="sales" label="销量" />
          <el-table-column prop="stock" label="库存" />
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="footer">
        <el-pagination
          v-model:current-page="pageNum"
          @current-change="handleChangePage"
          background
          :default-page-size="5"
          layout="prev, pager, next"
          :total="total"
        />
      </div>
    </div>
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
import type { SliderListData, GoodsData } from "./api/index";
import {
  getSliderList,
  addSlider,
  deleteSlider,
  getGoodsList,
} from "./api/index";
import { ref } from "vue";
import { Delete, Loading } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { ElMessage } from "element-plus";

// 请求数据
const requestFn = async () => {
  const res = await getSliderList();
  tableData.value = res.data;
};
requestFn();

/**
 * 操作栏事件
 */
const selectList = ref<SliderListData[]>([]);
const handleSelectionChange = (val: SliderListData[]) => {
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

// 批量删除
const handleBatchDelete = async () => {
  for (let i = 0; i < selectList.value.length; i++) {
    await deleteSlider({ sliderId: selectList.value[i].id });
  }
  handleRefresh();
};
/**
 * 表单
 */
const tableData = ref<SliderListData[]>([]);

/**
 * 对话框
 */
// 商品表格数据
const tableGoodsData = ref<GoodsData[]>([]);
const dialogFormVisible = ref(false);
const currentRow = ref<GoodsData>();
// 单选
const handleCurrentChange = (val: GoodsData | undefined) => {
  currentRow.value = val;
};
//搜索
const search = ref("");
const handleSearch = async (value: string) => {
  pageNum.value = 1;
  search.value = value;
  const res = await getGoodsList({
    search: search.value,
    pageNum: pageNum.value,
    pageSize: 5,
  });
  tableGoodsData.value = res.data.list;
  total.value = res.data.total;
};

const handleSubmit = async () => {
  if (currentRow.value?.id === undefined) {
    ElMessage({
      type: "warning",
      message: "请选择一个商品再进行操作",
      duration: 1000,
    });
    return;
  }
  const res = await addSlider({ productId: currentRow.value.id });
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
};

// 添加
const handleAdd = async () => {
  search.value = "";
  pageNum.value = 1;
  dialogFormVisible.value = true;
  const res = await getGoodsList({ pageNum: pageNum.value, pageSize: 5 });
  tableGoodsData.value = res.data.list;
  total.value = res.data.total;
};

// 分页
const total = ref(0);
const pageNum = ref(1);
const handleChangePage = async (page: number) => {
  const res = await getGoodsList({
    search: search.value,
    pageNum: page,
    pageSize: 5,
  });
  tableGoodsData.value = res.data.list;
  total.value = res.data.total;
};

// 单个删除
const handleDelete = async (item: SliderListData) => {
  await deleteSlider({ sliderId: item.id });
  handleRefresh();
};
</script>

<style lang="less" scoped>
.slider-manage {
  background-color: #fff;
  position: relative;
  min-height: 100%;
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
}
.dialog-add {
  height: 585px;
  position: relative;
}
.footer {
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>
