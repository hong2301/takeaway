<template>
  <view class="overtrue">
    <!--    顶部封面-->
    <view class="head">
      <view class="film"></view>
    </view>
    <!--    主要内容区-->
    <view class="body">
      <!--      顶部详细卡片-->
      <view class="face">
        <view class="face-up">
          <view class="face-up-img"></view>
          <view class="face-up-name"></view>
          <view class="face-up-name-right"></view>
          <view class="face-up-text"></view>
          <view class="face-up-notice"></view>
          <view class="face-up-collect">收藏</view>
        </view>
        <view class="face-down">
          <view class="face-down-brand"></view>
        </view>
      </view>
      <!--      点菜等按钮-->
      <view class="toolbar"></view>
      <!--      推荐栏-->
      <view class="recommend"></view>
      <view class="menu-box">
        <view class="menu-box-left"></view>
        <view class="menu-box-right"></view>
      </view>
    </view>
    <!--      购物车-->
    <view class="shoppingCart"></view>
  </view>
</template>

<script setup>
import { onMounted, getCurrentInstance } from 'vue'

onMounted(() => {
  const instance = getCurrentInstance().proxy
  const eventChannel = instance.getOpenerEventChannel()

  eventChannel.on('businessData', function (data) {
    console.log('businessData', data)
  })
})
</script>

<style lang="scss" scoped>
@import 'head.css';
@import 'body.css';
@import 'face.css';
page {
  background-color: #e2e0e0;
  height: 100%;
  overflow: hidden;
}
.overtrue {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
