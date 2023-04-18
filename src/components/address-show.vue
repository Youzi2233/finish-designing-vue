<template>
  <div class="address-show">
    <div class="detail-info">
      <div class="info">
        <van-tag class="tag" v-if="isDefault" type="primary">默认</van-tag>
        <span class="prefix-address">{{ prefixAddress }}</span>
        <h3 class="detail-address">{{ detailAddress }}</h3>
        <span class="name">{{ name }}</span
        ><span class="tel">{{ tel }}</span>
      </div>
      <div class="icon">
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Prop = {
  addressId: number;
  prefixAddress: string;
  detailAddress: string;
  isDefault: boolean;
  name: string;
  tel: string;
};
defineProps<Prop>();
</script>

<style lang="less" scoped>
.address-show {
  user-select: none;
  position: relative;
  background: repeating-linear-gradient(
    -45deg,
    #ff976a 0,
    #ff976a 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  background-size: 80px;
  .detail-info {
    padding: 15px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    .tag {
      margin-right: 5px;
    }
    .prefix-address {
      font-size: 14px;
      color: #000;
    }
    .detail-address {
      font-size: 18px;
      font-weight: 600;
      margin: 5px 0;
    }
    .name {
      margin-right: 5px;
    }
    .icon {
      margin-top: 10px;
    }
  }
  &::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 3px;
    background: repeating-linear-gradient(
      -45deg,
      #ff976a 0,
      #ff976a 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background-size: 80px;
    content: "";
  }
}
</style>
