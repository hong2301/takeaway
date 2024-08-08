<template>
  <view class="toolbar">
    <view
      class="toolbar-item"
      :class="[toolbarType === 1 ? 'toolbar-item-active' : '']"
      @click="Order"
      >点餐</view
    >
    <view
      class="toolbar-item"
      :class="[toolbarType === 2 ? 'toolbar-item-active' : '']"
      @click="Package"
    >
      <view class="toolbar-item-price">16元起</view>
      套餐
    </view>
    <view
      class="toolbar-item"
      :class="[toolbarType === 3 ? 'toolbar-item-active' : '']"
      @click="Evaluat"
      >评价</view
    >
    <view class="toolbar-spell">好友拼单</view>
    <view class="search-box">
      <view class="search-icon"></view>
      <input placeholder="搜索" class="search-input" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let toolbarType = ref<number>(1)

function Order() {
  toolbarType.value = 1
  Communicate()
}
function Package() {
  toolbarType.value = 2
  Communicate()
}
function Evaluat() {
  toolbarType.value = 3
  Communicate()
}
function Communicate() {
  uni.$emit('toolbar', { type: toolbarType.value })
}
</script>

<style scoped lang="scss">
.toolbar {
  width: 750rpx;
  height: 90rpx;
  display: flex;
}
.toolbar-item-price {
  position: absolute;
  width: 80%;
  height: 27%;
  border-radius: 50px;
  top: 16%;
  background-color: rgb(238, 146, 137);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18rpx;
}
.toolbar-item {
  position: relative;
  width: 13%;
  height: 100%;
  font-size: 33rpx;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;
  color: rgb(95, 95, 95);
  padding-bottom: 1%;
}
.toolbar-item-active {
  color: black;
  font-weight: 600;
}
.toolbar-item-active::after {
  content: ''; /* 添加伪元素 */
  position: absolute; /* 设置绝对定位，相对于.toolbar-item */
  left: 50%; /* 距离左边框的位置 */
  transform: translateX(-50%);
  bottom: 0; /* 距离底部的位置 */
  width: 50%; /* 下边框的宽度为元素宽度 */
  height: 2px; /* 下边框的高度 */
  background-color: rgb(245, 211, 121); /* 下边框的颜色 */
  border-radius: 10px;
}
.toolbar-spell {
  border: 1px solid rgb(250, 233, 204);
  width: 18%;
  font-size: 27rpx;
  display: flex;
  justify-content: center;
  height: 60%;
  align-items: center;
  margin-top: 4%;
  margin-left: 22%;
  border-radius: 8px;
  color: rgb(232, 132, 60);
}
.search-box {
  width: 18%;
  height: 53%;
  display: flex;
  margin-left: 2%;
  margin-top: 4.3%;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: rgb(245, 245, 245);
  border-radius: 50px;
}
.search-input {
  width: 97%;
  height: 80%;
  border-radius: 50px;
  padding-left: 40%;
  font-size: 11px;
}
.search-icon {
  position: absolute;
  background: url('@/static/search.svg');
  background-size: contain;
  width: 20%;
  aspect-ratio: 1;
  left: 10%;
}
</style>
