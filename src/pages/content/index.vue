<template>
  <view class="overtrue">
    <view class="head">
      <view class="Return" @click="Return">{{ returnText }}</view>
      <view class="film"></view>
    </view>
    <view class="body">
      <Face></Face>
      <Toolbar></Toolbar>
      <view class="menu-box">
        <SearchContent></SearchContent>
        <view v-if="toolbarType === 1" class="menu-content">
          <view class="menu-box-left">
            <view
              class="menu-box-item"
              :class="[
                item.sidebarMin < scrollTopTemp && scrollTopTemp < item.sidebarMax
                  ? 'menu-box-item-active'
                  : '',
                index <= 1 ? 'menu-box-item1' : '',
              ]"
              v-for="(item, index) in sidebar"
              :key="index"
              @click="ClickMenu(index)"
            >
              <image :src="item.icon" v-if="item.icon !== ''" class="menu-box-item-icon"></image>
              <view class="menu-box-item-text"> {{ item.name }}</view>
            </view>
          </view>
          <scroll-view
            id="scroll"
            class="menu-box-right"
            scroll-y
            @scroll="Scroll"
            :scroll-top="scrollTop"
          >
            <view v-if="sidebarType === 0" class="menu-box-right-recommend">
              <view class="recommend-sign">
                <view class="recommend-sign-fire">
                  <view class="recommend-sign-fire-icon"></view>
                  <view class="recommend-sign-fire-text">招牌</view>
                </view>
                <view class="recommend-sign-boss">老板推荐</view>
              </view>
            </view>
            <view
              class="real-dishes"
              v-for="(com, index1) in commodityAll"
              :key="index1"
              :id="com.bookmark"
            >
              <image :src="com.picture" class="real-dishes-img"></image>
              <view class="real-dishes-name">{{ com.name }}</view>
              <view class="real-dishes-price">¥{{ com.min_price }}</view>
              <view class="real-dishes-sub" v-if="com.number" @click="Sub(com, index1)">-</view>
              <view class="real-dishes-number" v-if="com.number">{{ com.number }}</view>
              <view class="real-dishes-add" @click="Add(com, index1)">+</view>
              <view class="real-dishes-sales">{{ com.month_saled_content }}</view>
              <view class="real-dishes-red"
                >{{ com.promotion.activity_text }}|{{ com.promotion.addition_text }}</view
              >
              <view class="real-dishes-evaluate">好评率{{ com.evaluate }}%</view>
              <view class="real-dishes-originPrice"></view>
            </view>
            <view class="blank"></view>
          </scroll-view>
        </view>
      </view>
    </view>

    <Shopping></Shopping>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { onHide } from '@dcloudio/uni-app'
import type { Menu, MeunSidebar, commodityList, Spu } from '@/types/commodity'
import { useRestaurantStore } from '@/stores/modules/restaurant'
import Face from '@/pages/content/component/face/index.vue'
import Toolbar from '@/pages/content/component/toolbar/index.vue'
import Shopping from '@/pages/content/component/shopping/index.vue'
import SearchContent from '@/pages/content/component/searchContent/index.vue'

const restaurantStore = useRestaurantStore()
let commodityData = ref<Menu>()
let sidebar = ref<MeunSidebar>([])
let sidebarType = ref<number>(0)
let commodityLists = ref<commodityList>([])
let price = ref<number>(0)
let showPrice = ref<string>('0')
let returnText = ref<string>('<')
let toolbarType = ref<number>(1)
let searchStr = ref<string>('')
let searchItem = ref<Array<Spu>>([])
let commodityAll = ref<Array<Spu>>([])
let scrollTop = ref<number>(0)
let scrollTopTemp = ref<number>(1)

onMounted(() => {
  GetCommodityData()
  GetLocalData()
})

onHide(() => {
  SafeLocalData()
})

uni.$on('toolbar', function (data) {
  toolbarType.value = data.type
})
uni.$on('shopping', function (data) {
  price.value = data.price
  commodityLists.value = data.commodityLists
})
uni.$on('search', function (data: { str: string }) {
  let btn = 1
  searchStr.value = data.str
  searchItem.value = []
  commodityLists.value.forEach((item, index) => {
    item.forEach((item1, index1) => {
      if (item1.name.includes(searchStr.value)) {
        searchItem.value.forEach((item2) => {
          if (item1.name === item2.name) {
            btn = 0
          }
        })
        if (btn) {
          item1.indexA = index
          item1.indexB = index1
          searchItem.value.push(item1)
        }
      }
    })
  })

  if (searchStr.value.length !== 0) {
    toolbarType.value = 0
    uni.$emit('searchData', {
      searchItem: searchItem.value,
      commodityLists: commodityLists.value,
    })
  } else {
    toolbarType.value = 1
  }
  uni.$emit('toolbar', {
    type: toolbarType.value,
  })
})
uni.$on('SearchData', function (data: { commodityLists: commodityList }) {
  commodityLists.value = data.commodityLists
})

function Add(item: { min_price: number; indexA: number; indexB: number }, index: number) {
  commodityLists.value[item.indexA][item.indexB].number++
  price.value += item.min_price
  showPrice.value = price.value.toFixed(2)

  uni.$emit('shopping', {
    price: price.value,
    commodityLists: commodityLists.value,
  })
}

function Sub(item: { min_price: number; indexA: number; indexB: number }, index: number) {
  commodityLists.value[item.indexA][item.indexB].number--
  price.value -= item.min_price
  showPrice.value = price.value.toFixed(2)

  uni.$emit('shopping', {
    price: price.value,
    commodityLists: commodityLists.value,
  })
}
function Scroll(event: any) {
  scrollTopTemp.value = event.detail.scrollTop
  console.log(scrollTopTemp.value)
}

function ClickMenu(index: number) {
  scrollTop.value = sidebar.value[index].sidebarMin
  sidebarType.value = index
  sidebar.value.map((item) => {
    item.active = false
  })
  sidebar.value[index].active = true
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
      commodityData.value?.food_spu_tags.forEach((item, index1) => {
        sidebar.value.push({
          name: item.name,
          icon: item.icon,
          active: false,
          sidebarMax: 0,
          sidebarMin: 0,
        })
        item.spus[0].bookmark = item.name
        item.spus.map((item) => (item.number = 0))
        commodityLists.value?.push(item.spus)
        item.spus.forEach((spuItem, index2) => {
          spuItem.indexA = index1
          spuItem.indexB = index2
          commodityAll.value.push(spuItem)
        })
      })
      SetSpider()
      sidebar.value[0].active = true
      let temp: number = 0
      commodityLists.value.forEach((item) => {
        item.forEach((item1) => {
          temp = (item1.praise_num / item1.month_saled) * 100
          item1.evaluate = temp.toFixed(0)

          temp = Number(item1.promotion.activity_text.replace('折', '')) / 10
          if (temp === 0) {
            item1.originPrice = item1.min_price
          } else {
            item1.originPrice = item1.min_price / temp
          }
          item1.originPrice = Number(item1.originPrice.toFixed(2))

          console.log(item1)
        })
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

function SetSpider() {
  let elements: any = 0
  let sidebarIndex: number = 0
  let shifting: number = 0
  nextTick(() => {
    uni
      .createSelectorQuery()
      .selectAll('.real-dishes')
      .boundingClientRect((data: any) => {
        elements = data
      })
      .exec(() => {
        shifting = elements[0].top
        commodityAll.value.forEach((item, index) => {
          if (item.bookmark !== undefined) {
            sidebar.value[sidebarIndex].sidebarMin = elements[index].top - shifting
            sidebarIndex++
          }
        })
        sidebar.value.forEach((item, index) => {
          if (index !== sidebar.value.length - 1) {
            item.sidebarMax = sidebar.value[index + 1].sidebarMin
          } else {
            item.sidebarMax = item.sidebarMin * 2
          }
        })
      })
  })
}

function Return() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.overtrue {
  height: 100vh;
  width: 750rpx;
  position: relative;
  overflow: hidden;
}
.head {
  width: 100%;
  height: 11.6%;
  background-color: #44081c;
  position: absolute;
}
.film {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.Return {
  position: absolute;
  display: flex;
  justify-items: center;
  align-items: center;
  width: 10%;
  height: 30%;
  top: 55%;
  left: 2%;
  padding-left: 3.5%;
  border: 1px solid #cccccc;
  border-radius: 50px;
  color: white;
  font-size: 30rpx;
  font-weight: 600;
  cursor: pointer;
}
.body {
  top: 11.6%;
  width: 100%;
  height: 1442.7616rpx;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
}
.recommend {
  width: 96%;
  height: 5%;
  display: flex;
}
.menu-box {
  width: 100%;
  height: 1442.7616rpx;
  display: flex;
  flex-direction: row;
}
.menu-content {
  width: 100%;
  height: 1442.7616rpx;
  display: flex;
  flex-direction: row;
}
.menu-box-left {
  width: 20%;
  height: 1050rpx;
  background-color: rgb(245, 245, 245);
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.menu-box-item {
  width: 100%;
  height: 80rpx;
  background-color: rgb(245, 245, 245);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.menu-box-item1 {
  margin-top: 5%;
  margin-bottom: 5%;
}
.menu-box-item-icon {
  width: 25rpx;
  height: 25rpx;
}
.menu-box-item-text {
  height: 80%;
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25rpx;
  text-align: center;
}
.menu-box-item-active {
  background-color: white;
}
.menu-box-right {
  position: relative;
  width: 80%;
  height: 1000rpx;
  background-color: #ffffff;
  overflow: auto;
}
.menu-box-right-recommend {
  height: 80rpx;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5%;
  margin-left: 5%;
}
.blank {
  width: 100%;
  height: 400rpx;
}
.real-dishes {
  width: 100%;
  height: 200rpx;
  align-items: center;
  display: flex;
  padding: 3%;
  position: relative;
}
.real-dishes-img {
  width: 160rpx;
  height: 160rpx;
  border-radius: 10px;
}
.real-dishes-name {
  width: 60%;
  height: 25%;
  margin-left: 2%;
  margin-bottom: 24%;
  font-weight: 500;
  font-size: 35rpx;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
}
.real-dishes-price {
  position: absolute;
  top: 70%;
  left: 32%;
  width: 15%;
  height: 25%;
  font-size: 30rpx;
  color: #ee4545;
}
.real-dishes-add {
  position: absolute;
  width: 7%;
  aspect-ratio: 1;
  background-color: rgb(235, 193, 80);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 25rpx;
  font-weight: 900;
  top: 70%;
  right: 3%;
  cursor: pointer;
}
.real-dishes-add:active {
  background-color: rgb(143, 114, 39);
}
.real-dishes-sales {
  position: absolute;
  width: 20%;
  height: 15%;
  left: 32%;
  top: 35%;
  font-size: 25rpx;
  color: #949191;
  display: flex;
  justify-content: left;
  align-items: center;
}
.real-dishes-red {
  position: absolute;
  height: 15%;
  top: 54%;
  left: 32%;
  color: #f56969;
  font-size: 18rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  border: 1px solid #fcbebe;
}
.real-dishes-evaluate {
  position: absolute;
  width: 20%;
  height: 15%;
  top: 35%;
  left: 50%;
  font-size: 25rpx;
  color: #949191;
  display: flex;
  justify-content: left;
  align-items: center;
}
.real-dishes-sub {
  position: absolute;
  width: 7%;
  aspect-ratio: 1;
  border: 1px solid rgb(235, 193, 80);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 25rpx;
  font-weight: 900;
  top: 70%;
  right: 20%;
  cursor: pointer;
}
.real-dishes-number {
  position: absolute;
  width: 7%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 25rpx;
  font-weight: 900;
  top: 70%;
  right: 11.6%;
}
.recommend-recommend {
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.recommend-recommend-icon {
  width: 35%;
  margin-left: 15%;
  aspect-ratio: 1;
  border-radius: 50px;
  background-color: rgb(233, 163, 96);
}
.recommend-recommend-text {
  width: 75%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20rpx;
  font-weight: 600;
}
.recommend-sign {
  width: 100%;
  height: 86%;
  position: relative;
}
.recommend-sign-fire {
  width: 100%;
  height: 100%;
  background-color: rgb(252, 234, 233);
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 53%;
}
.recommend-sign-fire-icon {
  width: 20%;
  aspect-ratio: 1;
  margin-right: 1%;
  background-color: rgb(239, 110, 100);
}
.recommend-sign-fire-text {
  width: 48%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 25rpx;
}
.recommend-sign-boss {
  position: absolute;
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  color: white;
  background-color: rgb(236, 95, 66);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25rpx;
  border-radius: 0 7px 7px 0;
  clip-path: polygon(7% 0%, 100% 0%, 100% 100%, 0% 100%);
}
</style>
