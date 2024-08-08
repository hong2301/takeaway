<template>
  <view class="overtrue">
    <view class="head">
      <view class="film"></view>
    </view>
    <view class="body">
      <Face></Face>
      <Toolbar></Toolbar>
      <view class="menu-box">
        <view class="menu-box-left">
          <view
            class="menu-box-item"
            :class="[item.active ? 'menu-box-item-active' : '', index <= 1 ? 'menu-box-item1' : '']"
            v-for="(item, index) in sidebar"
            :key="index"
            @click="ClickMenu(index)"
          >
            <image :src="item.icon" v-if="item.icon !== ''" class="menu-box-item-icon"></image>
            <view class="menu-box-item-text"> {{ item.name }}</view>
          </view>
        </view>
        <scroll-view class="menu-box-right" scroll-y>
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

    <Shopping></Shopping>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { onHide } from '@dcloudio/uni-app'
import type { Menu, MeunSidebar, commodityList, Spu } from '@/types/commodity'
import { useRestaurantStore } from '@/stores/modules/restaurant'
import Face from '@/pages/content/component/face/index.vue'
import Toolbar from '@/pages/content/component/toolbar/index.vue'
import Shopping from '@/pages/content/component/shopping/index.vue'

const restaurantStore = useRestaurantStore()
let commodityData = ref<Menu>()
let sidebar = ref<MeunSidebar>([])
let sidebarType = ref<number>(0)
let commodityLists = ref<commodityList>([])
let clickCommodity = ref<Array<Spu>>([])
let price = ref<number>(0)
let showPrice = ref<string>('0')

onMounted(() => {
  GetCommodityData()
  GetLocalData()
})

onHide(() => {
  SafeLocalData()
})

uni.$on('toolbar', function (data) {
  console.log('监听到事件来自 toolbar ，携带参数 type 为：' + data.type)
})

function Add(item: { min_price: number }, index: number) {
  commodityLists.value[sidebarType.value][index].number += 1
  clickCommodity.value = commodityLists.value[sidebarType.value]
  price.value += item.min_price
  showPrice.value = price.value.toFixed(2)

  uni.$emit('shopping', {
    price: price.value,
    commodityLists: commodityLists.value,
  })
}

function Sub(item: { min_price: number }, index: number) {
  commodityLists.value[sidebarType.value][index].number--
  clickCommodity.value = commodityLists.value[sidebarType.value]
  price.value -= item.min_price
  showPrice.value = price.value.toFixed(2)

  uni.$emit('shopping', {
    price: price.value,
    commodityLists: commodityLists.value,
  })
}

function ClickMenu(index: number) {
  sidebarType.value = index
  sidebar.value.map((item) => {
    item.active = false
  })
  sidebar.value[index].active = true
  clickCommodity.value = commodityLists.value[index]
}
function GetLocalData() {
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
    .then((res: any) => {
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
</script>

<style lang="scss" scoped>
@import 'style/recommend.css';
@import 'style/head.css';
@import 'style/body.css';
@import 'style/menu.css';
.overtrue {
  height: 1624rpx;
  width: 750rpx;
  position: relative;
  overflow: hidden;
}
</style>
