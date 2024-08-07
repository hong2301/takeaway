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
      <view class="menu-box" :style="`height:${menuHeight}px`">
        <view class="menu-box-left" :style="`height:${menuHeight}px`">
          <view
            class="menu-box-item"
            :class="[item.active ? 'menu-box-item-active' : '']"
            v-for="(item, index) in sidebar"
            :key="index"
            @click="ClickMenu(index)"
          >
            <image :src="item.icon" v-if="item.icon !== ''" class="menu-box-item-icon"></image>
            <view class="menu-box-item-text"> {{ item.name }}</view>
          </view>
        </view>
        <scroll-view :style="`height:${menuHeight}px`" class="menu-box-right" scroll-y>
          <view v-if="sidebarType === 0" class="menu-box-right-recommend">
            <view class="recommend-sign">
              <view class="recommend-sign-fire">
                <view class="recommend-sign-fire-icon"></view>
                <view class="recommend-sign-fire-text">招牌</view>
              </view>
              <view class="recommend-sign-boss">老板推荐</view>
            </view>
          </view>
          <view class="real-dishes" v-for="(com, index1) in clickCommodity" :key="index1">
            <image :src="com.picture" class="real-dishes-img"></image>
            <view class="real-dishes-name">{{ com.name }}</view>
            <view class="real-dishes-price">¥{{ com.min_price }}</view>
            <view class="real-dishes-sub" v-if="com.number" @click="Sub(com, index1)">-</view>
            <view class="real-dishes-number" v-if="com.number">{{ com.number }}</view>
            <view class="real-dishes-add" @click="Add(com, index1)">+</view>
          </view>
        </scroll-view>
      </view>
    </view>
    <!--      购物车-->
    <view class="shoppingCart" @click="ShowBill">¥ {{ showPrice }}</view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, getCurrentInstance, ref } from 'vue'
import type { restaurant } from '@/types/restaurant'
import type { Menu, MeunSidebar, commodityList, Spu } from '@/types/commodity'
import { useRestaurantStore } from '@/stores/modules/restaurant'

const restaurantStore = useRestaurantStore()
const businessData = ref<restaurant>()
let toolbarType = ref<number>(1)
let commodityData = ref<Menu>()
let sidebar = ref<MeunSidebar>([])
let sidebarType = ref<number>(0)
let commodityLists = ref<commodityList>([])
let clickCommodity = ref<Array<Spu>>([])
let menuHeight = ref<string>()
let showPrice = ref<string>()

onMounted(() => {
  showPrice.value = restaurantStore.price!.toFixed(2)
  if (restaurantStore.menu !== undefined) {
    commodityLists.value = restaurantStore.menu
  }
  GetHeight()
  GetLocalData()
  GetCommodityData()
  //GetBusinessData()
})

function ShowBill() {
  console.log("结账")
}

function Add(item, index) {
  commodityLists.value[sidebarType.value][index].number++
  clickCommodity.value = commodityLists.value[sidebarType.value]
  restaurantStore.setMenu(commodityLists.value)
  restaurantStore.setPrice(restaurantStore.price + item.min_price)
  showPrice.value = restaurantStore.price.toFixed(2)
}
function Sub(item, index) {
  commodityLists.value[sidebarType.value][index].number--
  clickCommodity.value = commodityLists.value[sidebarType.value]
  restaurantStore.setMenu(commodityLists.value)
  restaurantStore.setPrice(restaurantStore.price - item.min_price)
  showPrice.value = restaurantStore.price.toFixed(2)
}
//获取菜单栏的高度
function GetHeight() {
  let tempHeight: number
  uni
    .createSelectorQuery()
    .select('.toolbar')
    .boundingClientRect((data) => {
      tempHeight = data.bottom
    })
    .exec()
  menuHeight.value = uni.getWindowInfo().windowHeight - tempHeight
}
//点击侧边栏选项
function ClickMenu(index: number) {
  sidebarType.value = index
  sidebar.value.map((item) => {
    item.active = false
  })
  sidebar.value[index].active = true
  clickCommodity.value = commodityLists.value[index]
}
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
      commodityData.value = res.data.data
      console.log(commodityData.value?.food_spu_tags)

      commodityData.value?.food_spu_tags.forEach((item) => {
        sidebar.value.push({
          name: item.name,
          icon: item.icon,
          active: false,
        })
        item.spus.map((item) => (item.number = 0))
        commodityLists.value?.push(item.spus)
      })
      clickCommodity.value = commodityLists.value[0]
      sidebar.value[0].active = true
      restaurantStore.setMenu(commodityLists.value)
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
@import 'style/menu.css';
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
