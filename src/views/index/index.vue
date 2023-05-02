<template>
  <div class="index">
    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
      @search="handleSearch"
    />
    <!-- 轮播图 -->
    <van-swipe
      @change="onChange"
      v-if="sliderList.length"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item v-for="item in sliderList">
        <div class="container" :style="bgColor">
          <van-image
            @click="router.push(`/goodsDetail/${item.productId}`)"
            width="100vw"
            height="200px"
            fit="contain"
            :src="item.img"
          />
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 商品分类bar -->
    <van-tabs v-model:active="active" swipeable>
      <van-tab v-for="item in categoryList" :title="item.categoryName">
        <!-- 商品推荐列表 -->
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
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import { getSliderList, getCateList, getRecommendList } from "./api/index";
import type {
  GetListData,
  GetCateListtData,
  RecommendGoodsData,
} from "./api/index";
import { useRouter } from "vue-router";
import { getGoodsList } from "@/views/personalPage/api/index";
import infiniteLoading from "@/components/infinite-loading.vue";
import { useImageColor } from "@/hook/index";
const router = useRouter();
// 搜索
console.log(1);

const searchValue = ref("");
const handleSearch = (value: string) => {
  router.push({
    path: "/search",
    query: {
      search: value,
    },
  });
};

// 轮播图
const bgColorList = ref<string[]>([]);
const sliderList = ref<GetListData[]>([]);
getSliderList().then((res) => {
  sliderList.value = res.data;
  sliderList.value.forEach(async (item) => {
    const res = await useImageColor(item.img);
    bgColorList.value.push(res.avgColor.value ?? "#fff");
    bgColor.backgroundColor = bgColorList.value[0];
  });
});

const bgColor = reactive({
  backgroundColor: "fff",
});
const onChange = (index: number) => {
  bgColor.backgroundColor = bgColorList.value[index];
};

// 分类
const active = ref(0);
const categoryList = ref<GetCateListtData[]>([
  {
    categoryId: 0,
    categoryName: "推荐",
    categoryDescription: "推荐",
  },
]);
getCateList().then((res) => {
  categoryList.value.push(...res.data);
});

// 根据分类获取商品列表

const goodsList = ref<RecommendGoodsData[]>([]);
const pageNum = ref(0);

// 加载中
const loading = ref(false);
// 是否加载完毕
const finished = ref(false);
const getData = async () => {
  pageNum.value = pageNum.value + 1;
  loading.value = true;
  try {
    let res;
    if (!categoryList.value[active.value].categoryId) {
      res = await getRecommendList({ pageNum: pageNum.value, pageSize: 10 });
    } else {
      res = await getGoodsList({
        categoryId: categoryList.value[active.value].categoryId,
        pageNum: pageNum.value,
      });
    }
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
// 切换分类时

watch(active, () => {
  pageNum.value = 0;
  goodsList.value = [];
  finished.value = false;
  getData();
});
</script>

<style lang="less" scoped>
.index {
  padding-bottom: 50px;
  .container {
    height: 200px;
  }
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
}
</style>
