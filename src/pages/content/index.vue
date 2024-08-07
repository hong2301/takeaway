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
      <view class="menu-box">
        <view class="menu-box-left">
          <view
            class="menu-box-item"
            :class="[
              item.active ? 'menu-box-item-active' : '',
              index !== 0 || index !== 1 ? 'menu-box-item1' : '',
            ]"
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
    <view class="shoppingCart" @click="ShowBill"
      >¥ {{ showPrice }}
      <view v-if="billBtn" class="settlement" @click="Pay">去结算</view>
    </view>
    <view class="bilCard" :class="[billBtn ? 'bilCard-up' : '']">
      <view class="bilCard-top">
        <view class="bilCard-text">已选商品</view>
        <view class="bilCard-clear" @click="ClearBill">清空购物车</view>
      </view>
      <view class="bilCard-item-box">
        <view class="bilCard-item" v-for="(item, index) in billCommodity" :key="index">
          <image :src="item.picture" class="real-dishes-img"></image>
          <view class="bilCard-item-name">{{ item.name }}</view>
          <view class="bilCard-item-price">¥{{ item.min_price }}</view>
          <view class="bilCard-item-sub" v-if="item.number" @click="BilSub(item, index)">-</view>
          <view class="bilCard-item-number" v-if="item.number">{{ item.number }}</view>
          <view class="bilCard-item-add" @click="BilAdd(item, index)">+</view>
        </view>
      </view>
    </view>
    <view class="film1" v-if="billBtn" @click="billBtn = false"></view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, getCurrentInstance, ref } from 'vue'
import { onHide } from '@dcloudio/uni-app'
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
let billCommodity = ref<Array<Spu>>([])
let menuHeight = ref<string>()
let price = ref<number>(0)
let showPrice = ref<string>('0')
let billBtn = ref<boolean>(false)

onMounted(() => {
  GetCommodityData()
  GetLocalData()
  GetHeight()
})
//页面隐藏
onHide(() => {
  SafeLocalData()
})
function ClearBill() {
  billCommodity.value = []
  commodityLists.value?.forEach((item, index) => {
    item.forEach((item1, index1) => {
      item1.number = 0
    })
  })
  price.value = 0
  showPrice.value = 0
  billBtn.value = false
}
function BilAdd(item, index) {
  commodityLists.value[item.indexA][item.indexB].number++
  clickCommodity.value = commodityLists.value[item.indexA]
  price.value += item.min_price
  billCommodity.value[index].number++
  showPrice.value = price.value.toFixed(2)
}
function BilSub(item, index) {
  commodityLists.value[item.indexA][item.indexB].number--
  clickCommodity.value = commodityLists.value[item.indexA]
  price.value -= item.min_price
  billCommodity.value[index].number--
  showPrice.value = price.value.toFixed(2)
  if (billCommodity.value[index].number === 0) {
    billCommodity.value.splice(index, 1)
  }
  if (billCommodity.value.length === 0) {
    billBtn.value = false
  }
}
function ShowBill() {
  console.log('结账')
  billCommodity.value = []
  commodityLists.value?.forEach((item, index) => {
    item.forEach((item1, index1) => {
      if (item1.number !== 0) {
        billCommodity.value.push({
          name: item1.name,
          picture: item1.picture,
          min_price: item1.min_price,
          number: item1.number,
          indexA: index,
          indexB: index1,
        })
      }
    })
  })
  if (billCommodity.value.length !== 0) {
    billBtn.value = true
  }
}

function Add(item, index) {
  commodityLists.value[sidebarType.value][index].number += 1
  clickCommodity.value = commodityLists.value[sidebarType.value]
  price.value += item.min_price
  showPrice.value = price.value.toFixed(2)
}
function Sub(item, index) {
  commodityLists.value[sidebarType.value][index].number--
  clickCommodity.value = commodityLists.value[sidebarType.value]
  price.value -= item.min_price
  showPrice.value = price.value.toFixed(2)
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
  })
}
function GetLocalData() {
  businessData.value = restaurantStore.profile
  price.value = restaurantStore.price
  showPrice.value = price.value.toFixed(2)
  if (restaurantStore.menu !== undefined) {
    commodityLists.value = [...restaurantStore.menu]
  }
}
function SafeLocalData() {
  restaurantStore.setPrice(price.value)
  commodityLists.value.length = 11
  restaurantStore.setMenu(commodityLists.value)
}
function GetCommodityData() {
  uni
    .request({
      url: 'https://console-mock.apipost.cn/mock/2574b6b3-81e9-4929-9b74-a38530e92e3e/spuData?apipost_id=35c074',
      method: 'GET',
    })
    .then((res) => {
      commodityData.value = res.data.data
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
    })
    .catch((err) => {
      console.log(err)
    })
}
function Pay() {
  uni.navigateTo({
    url: '/pages/bill/index',
    success: function () {
      restaurantStore.setBailData(billCommodity.value)
      restaurantStore.setPrice(price.value)
    },
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
.overtrue {
  height: 1624rpx;
  width: 750rpx;
  position: relative;
  overflow: hidden;
}
.film1 {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
</style>
