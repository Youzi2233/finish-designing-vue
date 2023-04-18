<template>
  <van-swipe-cell>
    <div
      class="cart-goods-card"
      @click="router.push(`/goodsDetail/${goods.productId}`)"
    >
      <!-- 复选框 -->
      <van-checkbox
        v-if="showChecked"
        @click.stop="() => {}"
        @change="handleChecked"
        v-model="checked"
      ></van-checkbox>
      <!-- 商品图片 -->
      <img class="goodsImg" :src="goods.image" />
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 名称 -->
        <h3 class="title">{{ goods.name }}</h3>
        <!-- 操作栏 -->
        <div class="action-bar">
          <span class="num">{{ `¥${goods.price}` }}</span>
          <goodsCheckedBox
            @number-change="numberChange"
            v-model="goodsNumber"
          />
        </div>
      </div>
    </div>
    <template #right>
      <van-button
        square
        type="danger"
        @click.stop="handleDelete"
        text="删除"
        class="delete-button"
      />
    </template>
  </van-swipe-cell>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import goodsCheckedBox from "@/components/goodsCheckBox.vue";
import { useVModel } from "@vueuse/core";
import type { GetCartListData } from "../views/cart/api/index";
import {
  changeCount,
  changeChecked,
  deleteCartProduct,
} from "@/views/cart/api/index";
import { useRouter } from "vue-router";
type Prop = {
  showChecked: boolean;
  modelValue: number;
  goods: Partial<GetCartListData>;
};
const props = defineProps<Prop>();

const emit = defineEmits(["selected", "delete"]);
const goodsNumber = useVModel(props, "modelValue");
const checked = ref(false);
const router = useRouter();

// 数量发生改变时
const numberChange = async (number: number) => {
  if (props.goods.id)
    await changeCount({ cartId: props.goods.id, count: number });
};

watch(
  () => props.goods.checked,
  () => {
    checked.value = props.goods.checked === "0" ? false : true;
  },
  { immediate: true }
);

const handleChecked = (checked: boolean) => {
  if (props.goods.id)
    changeChecked({ cartId: props.goods.id, checked: checked ? 1 : 0 });
  emit("selected", checked, props.goods);
};

// 删除
const handleDelete = async () => {
  if (props.goods.id) await deleteCartProduct({ cartId: props.goods.id });
  emit("delete");
};
</script>

<style lang="less" scoped>
.cart-goods-card {
  display: flex;
  background-color: #fff;
  padding: 10px;
  user-select: none;
  .goodsImg {
    width: 30vw;
    height: 30vw;
    border-radius: 10px;
    margin: 0 10px;
  }
  .goods-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 15px;
      color: #000;
      font-weight: 500;
      overflow: hidden;
      word-break: break-all;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .action-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .num {
        color: red;
        font-size: 18px;
      }
    }
  }
}
.delete-button {
  height: 100%;
}
</style>
