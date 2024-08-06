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
          <image :src="businessData?.picUrl" class="face-up-img"></image>
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
      <!--      点菜等按钮-->
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
      <!--      推荐栏-->
      <!--      <view class="recommend">-->
      <!--        <view class="recommend-recommend">-->
      <!--          <view class="recommend-recommend-icon"></view>-->
      <!--          <view class="recommend-recommend-text">推荐</view>-->
      <!--        </view>-->
      <!--        <view class="recommend-sign">-->
      <!--          <view class="recommend-sign-fire">-->
      <!--            <view class="recommend-sign-fire-icon"></view>-->
      <!--            <view class="recommend-sign-fire-text">招牌</view>-->
      <!--          </view>-->
      <!--          <view class="recommend-sign-boss">老板推荐</view>-->
      <!--        </view>-->
      <!--      </view>-->
      <view class="menu-box">
        <view class="menu-box-left">
          <view class="menu-box-item"></view>
        </view>
        <view class="menu-box-right"></view>
      </view>
    </view>
    <!--      购物车-->
    <view class="shoppingCart"></view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, getCurrentInstance, ref } from 'vue'
import type { restaurant } from '@/types/restaurant'
import type { commodity } from '@/types/commodity'
import { useRestaurantStore } from '@/stores/modules/restaurant'

const restaurantStore = useRestaurantStore()
const businessData = ref<restaurant>()
let toolbarType = ref<number>(1)
let commodityData = ref<commodity>()

onMounted(() => {
  GetLocalData()
  GetCommodityData()
  //GetBusinessData()
})
function GetBusinessData() {
  const instance = getCurrentInstance()?.proxy
  const eventChannel = instance?.getOpenerEventChannel()

  eventChannel.on('businessData', function (data: any) {
    businessData.value = data.data
    console.log(businessData.value)
    console.log(restaurantStore.profile)
  })
}
function GetLocalData() {
  businessData.value = restaurantStore.profile
}
function GetCommodityData() {
  uni
    .request({
      url: 'https://console-mock.apipost.cn/mock/2574b6b3-81e9-4929-9b74-a38530e92e3e/spuData?apipost_id=35c074',
      method: 'GET',
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
//点餐
function Order() {
  console.log('点餐')
  toolbarType.value = 1
}
//套餐
function Package() {
  console.log('套餐')
  toolbarType.value = 2
}
//评价
function Evaluat() {
  console.log('评价')
  toolbarType.value = 3
}
</script>

<style lang="scss" scoped>
@import 'style/recommend.css';
@import 'style/head.css';
@import 'style/body.css';
@import 'style/face.css';
@import 'style/toolbar.css';
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
