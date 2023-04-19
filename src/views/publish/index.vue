<template>
  <div class="publish">
    <div class="header">
      <van-icon @click="router.back()" class="icon" name="arrow-left" />
      <h3 class="title">{{ title }}</h3>
    </div>
    <!-- 商品表单 -->
    <div class="goods-form">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="form.name"
            label="商品名称"
            placeholder="商品名称"
            :rules="[{ required: true, message: '请填写商品名称' }]"
          />
          <van-field
            v-model="result"
            is-link
            readonly
            label="分类"
            placeholder="点击选择分类"
            @click="showPicker = true"
          />
          <van-popup v-model:show="showPicker" position="bottom">
            <van-picker
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-field
            v-model="form.price"
            label="价格"
            placeholder="商品价格"
            :rules="[{ required: true, message: '请填写商品价格' }]"
          />
          <van-field
            v-model="form.stock"
            label="库存"
            placeholder="商品库存"
            :rules="[{ required: true, message: '请填写商品名称' }]"
          />
          <van-field
            name="uploader"
            label="封面"
            :rules="[{ required: true, message: '请上传商品封面' }]"
          >
            <template #input>
              <van-uploader
                v-model="fileList"
                :max-count="1"
                :on-delete="handleDelete"
                :max-size="5 * 1024 * 1024"
                :after-read="afterRead"
                :before-read="beforeRead"
              />
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ref, reactive } from "vue";
import { showFailToast, showSuccessToast } from "vant";
import { useUserInfoStore } from "@/store";
import { upload, addProduct, getCateList, getGoodsDetail } from "./api/index";
const router = useRouter();
const route = useRoute();
const title = ref(route.fullPath === "/publish" ? "发布商品" : "编辑商品");
const userStore = useUserInfoStore();

interface Column {
  text: string;
  value: number;
}
interface fileListItem {
  url: string;
}
const fileList = ref<fileListItem[]>([]);

const form = reactive({
  id: 0,
  name: "",
  image: "",
  price: "",
  stock: "",
  categoryId: 0,
});

if (route.query.id) {
  getGoodsDetail({ productId: Number(route.query.id) }).then((res) => {
    form.id = res.data.id;
    form.name = res.data.name;
    form.image = res.data.image;
    form.price = String(res.data.price);
    form.stock = String(res.data.stock);
    form.categoryId = res.data.categoryId;
    result.value = res.data.categoryName;
    fileList.value.push({ url: res.data.image });
  });
}

const result = ref("");
const showPicker = ref(false);
const columns = ref<Column[]>([]);
getCateList().then((res) => {
  res.data.forEach((item) => {
    columns.value.push({ text: item.categoryName, value: item.categoryId });
  });
});
const onConfirm = (item: any) => {
  result.value = item.selectedOptions[0]?.text;
  form.categoryId = item.selectedOptions[0]?.value;
  showPicker.value = false;
};

//校验图片的格式
const beforeRead = (file: any) => {
  if (!/(jpg|jpeg|png|JPG|PNG)/i.test(file.type)) {
    showFailToast({
      message: "请上传正确格式的图片",
      duration: 1000,
    });
    return false;
  }
  return true;
};

// 上传以后
const afterRead = async (file: any) => {
  // 上传状态提示开启
  file.status = "uploading";
  file.message = "上传中...";
  console.log(file);
  const formData = new FormData();
  formData.append("file", file.file);
  const res = await upload(formData);
  if (res.msg.toLowerCase() == "success") {
    // 上传状态提示关闭
    file.status = "done";
    showSuccessToast({
      message: "上传成功",
      duration: 1000,
      className: "bg-dark",
    });
    form.image = res.data;
  }
};

const handleDelete = () => {
  form.image = "";
};

const onSubmit = async () => {
  console.log("123");
  // 发布商品
  if (route.fullPath === "/publish") {
    const res = await addProduct({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
    if (res.msg.toLowerCase() == "success") {
      router.back();
      showSuccessToast({
        message: "发布成功",
        duration: 1000,
        className: "bg-dark",
      });
    }
  }
};
</script>

<style lang="less" scoped>
.publish {
  min-height: 100vh;
  background-color: #f2f2f2;
  .header {
    position: relative;
    background-color: #fff;
    .icon {
      position: absolute;
      font-size: 24px;
      top: 10px;
      left: 10px;
    }
    .title {
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      padding: 10px;
      color: #000;
    }
  }
  .goods-form {
    margin-top: 10px;
  }
}
</style>
<style>
.bg-dark {
  background: rgb(0, 0, 0, 0.7);
}
</style>
