<template>
  <div class="search">
    <div class="header">
      <!-- 搜索框 -->
      <div class="icon" @click="router.back()">
        <van-icon name="arrow-left" />
      </div>
      <div class="searchInput">
        <van-search
          v-model="searchForm.search"
          shape="round"
          placeholder="请输入搜索关键词"
          @search="handleSearch"
        />
      </div>
    </div>
    <!-- action-bar -->
    <div class="action-bar">
      <!-- 筛选 -->
      <van-button
        @click="show = true"
        style="width: 100%; height: 30px"
        round
        type="primary"
      >
        筛选
      </van-button>
    </div>
    <div class="content">
      <!-- 商品展示列表 -->
      <div>
        <div class="goods-list" v-if="goodsList">
          <goodsCard
            v-for="item in goodsList"
            :id="item.id"
            :cover="item.image"
            :goods-name="item.name"
            :price="item.price"
          />
        </div>
        <!-- 无限加载组件 -->
        <infiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        />
      </div>
    </div>
    <!-- 弹出框 -->
    <van-action-sheet v-model:show="show" title="标题">
      <!-- 价格区间 -->
      <div class="price-box">
        <div class="title">价格区间</div>
        <div class="price-section">
          <input
            class="priceInput"
            v-model="searchForm.minPrice"
            placeholder="最低价"
          />
          <div class="icon">-</div>
          <input
            class="priceInput"
            v-model="searchForm.maxPrice"
            placeholder="最高价"
          />
        </div>
      </div>
      <!-- 操作栏 -->
      <div class="operation-bar">
        <van-button @click="handleResize" class="btn" round plain type="danger"
          >重置</van-button
        >
        <van-button
          @click="handleSubmit"
          class="btn"
          round
          color="linear-gradient(to right, #ff6034, #ee0a24)"
        >
          确定
        </van-button>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { reactive } from "vue";
import { getGoodsList } from "@/views/personalPage/api/index";
import type { GoodsData } from "@/views/personalPage/api/index";
import goodsCard from "@/components/goodsCard.vue";

const route = useRoute();
const router = useRouter();

const searchForm = reactive({
  search: String(route.query.search) ?? "",
  pageNum: 0,
  minPrice: "",
  maxPrice: "",
});

// 搜索
const handleSearch = (value: string) => {
  router.replace({
    path: "/search",
    query: {
      search: value,
    },
  });
  goodsList.value = [];
  searchForm.pageNum = 0;
  getData();
};

// 弹出框
const show = ref(false);
const handleResize = () => {
  searchForm.minPrice = "";
  searchForm.maxPrice = "";
};
const handleSubmit = () => {
  goodsList.value = [];
  searchForm.pageNum = 0;
  getData();
  show.value = false;
};

const goodsList = ref<GoodsData[]>([]);

// 加载中
const loading = ref(false);
// 是否加载完毕
const finished = ref(false);
const getData = async () => {
  searchForm.pageNum = searchForm.pageNum + 1;
  loading.value = true;
  try {
    const res = await getGoodsList({
      ...searchForm,
      minPrice: searchForm.minPrice ? Number(searchForm.minPrice) : undefined,
      maxPrice: searchForm.maxPrice ? Number(searchForm.maxPrice) : undefined,
    });
    // 获取数据成功
    if (res.data.list.length) {
      // 有数据就追加数据
      goodsList.value.push(...res.data.list);
    } else {
      // 没有数据，加载完成
      finished.value = true;
    }
    loading.value = false;
  } catch (error) {
    // 没有数据，加载完成
    finished.value = true;
    loading.value = false;
  }
};
</script>

<style lang="less" scoped>
.search {
  background-color: #f2f2f2;
  min-height: 100vh;
  .header {
    background-color: #fff;
    display: flex;
    .searchInput {
      flex: 1;
    }
    .icon {
      width: 54px;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-size: 24px;
    }
  }
  .content {
    .goods-list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
    }
  }
  .action-bar {
    padding: 5px 20vw;
    background-color: #fff;
  }
  .price-box {
    padding: 0 5vw;
    height: 15vh;
    .title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .price-section {
      display: flex;

      .priceInput {
        width: 40vw;
        height: 40px;
        border-radius: 30vw;
        text-align: center;
        background-color: #f7f8fa;
        border: 1px solid #f7f8fa;
        font-size: 14px;
      }
      .icon {
        height: 30px;
        line-height: 30px;
        margin: 0 5px;
      }
    }
  }
  .operation-bar {
    display: flex;
    justify-content: space-between;
    padding: 10px 5vw;
    .btn {
      width: 40vw;
    }
  }
}
</style>
