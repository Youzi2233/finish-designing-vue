<template>
  <div class="address-edit">
    <div class="header">
      <van-icon @click="router.back()" class="icon" name="arrow-left" />
      <h3 class="title">
        {{ (route.query.id ? "编辑" : "新建") + "收货地址" }}
      </h3>
    </div>
    <div class="edit-area">
      <van-address-edit
        :address-info="addressInfo"
        :show-delete="isEdit"
        :area-list="areaList"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { areaList } from "@vant/area-data";
import { AddressEditInfo, showFailToast, showSuccessToast } from "vant";
import {
  addAddress,
  getAddressById,
  editAddress,
  deleteAddress,
} from "./api/index";
import { reactive } from "vue";
const router = useRouter();
const route = useRoute();

const isEdit = route.query.id ? true : false;
// 默认值
const addressInfo = reactive<AddressEditInfo>({
  tel: "",
  name: "",
  city: "",
  county: "",
  country: "",
  province: "",
  areaCode: "",
  addressDetail: "",
  isDefault: false,
});

if (isEdit) {
  getAddressById(Number(route.query.id)).then((res) => {
    addressInfo.name = res.data.name;
    addressInfo.tel = res.data.tel;
    addressInfo.province = res.data.province;
    addressInfo.city = res.data.city;
    addressInfo.county = res.data.district;
    addressInfo.addressDetail = res.data.userAddress;
    addressInfo.isDefault = res.data.isDefault === "1" ? true : false;
  });
}
// 保存
const onSave = async (info: AddressEditInfo) => {
  // console.log(info);
  if (!isEdit) {
    // 新增收货地址
    const res = await addAddress({
      ...info,
      isDefault: info.isDefault ? "1" : "0",
      userAddress: info.addressDetail,
      district: info.county,
    });
    if (res.msg.toLowerCase() === "success") {
      showSuccessToast({
        duration: 1000,
        message: "添加成功",
      });
      router.replace("/addressManage");
    } else {
      showFailToast({
        duration: 1000,
        message: res.msg,
      });
    }
  } else {
    const res = await editAddress({
      ...info,
      addressId: Number(route.query.id),
      isDefault: info.isDefault ? "1" : "0",
      userAddress: info.addressDetail,
      district: info.county,
    });
    if (res.msg.toLowerCase() === "success") {
      showSuccessToast({
        duration: 1000,
        message: "编辑成功",
      });
      router.replace("/addressManage");
    }
  }
};

// 删除
const onDelete = async () => {
  const res = await deleteAddress({ addressId: Number(route.query.id) ?? 0 });
  if (res.msg.toLowerCase() === "success") {
    showSuccessToast({
      duration: 1000,
      message: "删除成功",
    });
    router.replace("/addressManage");
  } else {
    showFailToast({
      duration: 1000,
      message: res.msg,
    });
  }
};
</script>

<style lang="less" scoped>
.address-edit {
  position: relative;
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
}
</style>
