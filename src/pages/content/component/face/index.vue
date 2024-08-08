<template>
  <view class="face">
    <view class="face-up">
      <image class="face-up-img" :src="businessData?.picUrl"></image>
      <view class="face-up-name">{{ businessData?.shopName }}</view>
      <view class="face-up-name-right"></view>
      <view class="face-up-text"></view>
      <view class="face-up-notice"
        >公告: 欢迎光临肯德基宅急送，专业外送，全程保温，准时送达!sdfsdkfsdfnsjkdfns</view
      >
      <view class="face-up-collect">收藏</view>
    </view>
    <view class="face-down">
      <view class="face-down-brand">5.88折起</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { restaurant } from '@/types/restaurant'
import { onMounted, ref } from 'vue'
import { useRestaurantStore } from '@/stores/modules/restaurant'

const restaurantStore = useRestaurantStore()
const businessData = ref<restaurant>()

onMounted(() => {
  businessData.value = restaurantStore.profile
})
</script>

<style scoped lang="scss">
.face {
  background-color: rgb(255, 255, 255);
  width: 700rpx;
  height: 230rpx;
  margin-top: -2.9%;
  border-radius: 20rpx;
  box-shadow: 2px 4px 4px rgb(0, 0, 0, 0.2);
}
.face-up {
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 70%;
  padding: 3%;
  display: flex;
  position: relative;
  border-radius: 20rpx;
}
.face-up-img {
  height: 80rpx;
  width: 100rpx;
}
.face-up-name {
  height: 50%;
  width: 60%;
  margin-left: 2%;
  font-size: 41rpx;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.face-up-name-right {
  background-image: url('@/static/right.svg');
  background-size: cover;
  position: absolute;
  top: 16%;
  left: 75%;
  width: 6%;
  padding-top: 6%;
  cursor: pointer;
}
.face-up-text {
  position: absolute;
  top: 50%;
  left: 18%;
  height: 22%;
  width: 63%;
}
.face-up-notice {
  position: absolute;
  width: 93.5%;
  height: 22%;
  left: 5%;
  top: 72%;
  color: #b7b7b7;
  font-size: 23rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.face-up-collect {
  background-color: rgb(255, 255, 255);
  position: absolute;
  width: 12%;
  height: 29%;
  top: 15%;
  left: 84.5%;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25rpx;
}
.face-up-collect:active {
  background-color: rgb(213, 212, 212);
}
.face-down {
  background-color: rgb(245, 245, 245);
  width: 100%;
  height: 30%;
  padding: 0 5% 0 5%;
  border-radius: 0 0 20rpx 20rpx;
  display: flex;
  justify-content: left;
  align-items: center;
}
.face-down-brand {
  background-color: rgb(250, 250, 250);
  width: 15%;
  height: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(245, 129, 119);
  font-size: 20rpx;
  border: 1px solid rgb(250, 203, 198);
  border-radius: 5px;
}
</style>
