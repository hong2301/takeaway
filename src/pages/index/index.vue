<template>
  <view class="overtrue">
    <!-- 头部区域 -->
    <view class="head">
      <view class="address-box">
        <view class="address-icon"></view>
        <view class="address-text">鲸山云科技(珠海)有限公司</view>
        <view class="address-right"></view>
      </view>
    </view>

    <!-- 商店列表区 -->
    <view class="body">
      <!-- 搜索栏 -->
      <view class="search-box">
        <view class="search-icon"></view>
        <input placeholder="蛙来哒·牛蛙" class="search-input" />
        <button class="search-button" @click="Test">搜索</button>
      </view>
      <!-- 商店滚动区 -->
      <scroll-view class="body-scroll" scroll-y="true" @scroll="onScroll">
        <!-- 其他内容，没有数据支撑，暂时没有渲染细节 -->
        <view class="card-other" :style="cardOtherstyle"></view>
        <!-- 商店项 -->
        <view
          class="business-list"
          v-for="(item, index) in businessList"
          :key="index"
          @click="InRestaurant(item)"
        >
          <view class="item-up">
            <image class="up-img" mode="aspectFill" :src="item.picUrl"></image>
            <view class="up-certificate">神券</view>
            <view class="up-name">{{ item.shopName }}</view>
            <view class="up-samllTitle1">{{ item.monthSalesTip }} {{ item.averagePriceTip }}</view>
            <view class="up-samllTitle2">{{ item.minPriceTip }} {{ item.shippingFeeTip }}</view>
            <view class="up-samllTitle3">{{ item.deliveryTimeTip }} {{ item.distance }}</view>
          </view>
          <view v-if="item.ad_mark" class="item-down">
            <view class="down-img"></view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow, onHide } from '@dcloudio/uni-app'
import type { eventType } from '@/types/event'
import type { restaurant } from '@/types/restaurant'
import { useRestaurantStore } from '../../stores/modules/restaurant'
import { ref } from 'vue'

////变量区
let cardOtherstyle = ref() //其他内容卡片的样式，用于滑动隐藏
let upImgStyle = ref() //图片伸缩样式
let businessList = ref() //商店列表
const restaurantStore = useRestaurantStore()

////函数区
//页面显示
onShow(() => {
  console.log('index Show')
  GetBusiness()
})

//页面隐藏
onHide(() => {
  console.log('index Hide')
})

function Test(value) {
  console.log('test', value)
  // uni
  //   .createSelectorQuery()
  //   .select('.card-other')
  //   .fields({ computedStyle: ['width', 'height', 'backgroundColor'] }, (data) => {
  //     console.log(data)
  //   })
  //   .exec()
  // 同步方式获取
  // const info = uni.getSystemInfoSync()
  // console.log('导航栏高度:', info)
}

//获取商店列表
function GetBusiness() {
  uni
    .request({
      url: 'https://console-mock.apipost.cn/mock/2574b6b3-81e9-4929-9b74-a38530e92e3e/storeData?apipost_id=de11f7',
      method: 'GET',
    })
    .then((res) => {
      businessList.value = res.data.data.shopList
    })
    .catch((err) => {
      console.log(err)
    })
}

//商店滚动区滚动触发
function onScroll(event: eventType) {
  let elementHreight
  uni
    .createSelectorQuery()
    .select('.card-other')
    .boundingClientRect((data) => {
      elementHreight = data.height
    })
    .exec()
  cardOtherstyle.value = `
  opacity:${(elementHreight - event.detail.scrollTop) / 100};`
}
function InRestaurant(item: restaurant) {
  console.log('进入餐厅')
  restaurantStore.setProfile(item)
  uni.navigateTo({
    url: '/pages/content/content?id=' + item.mtWmPoiId,
    success: function (res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('businessData', { data: item })
    },
  })
}
</script>

<style lang="scss" scoped>
page {
  background-color: #e2e0e0;
  height: 100%;
  overflow: hidden;
}
.overtrue {
  height: 100%;
  width: 100%;
}
.head {
  width: 100%;
  height: 20%;
  background: linear-gradient(to top right, rgb(238, 221, 32), rgb(245, 191, 109));
}
.address-box {
  width: 70%;
  height: 26%;
  transform: translate(3%, 95%);
  display: flex;
  justify-content: left;
  align-items: center;
}
.address-icon {
  width: 9%;
  padding-top: 9%;
  background-image: url('@/static/dingwei.svg');
  background-size: cover;
  margin-right: 1%;
  cursor: pointer;
}
.address-text {
  width: 72.5%;
  font-weight: 1000;
  font-size: large;
  cursor: pointer;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
}
.address-right {
  width: 6%;
  padding-top: 6%;
  background-image: url('@/static/right.svg');
  background-size: cover;
  cursor: pointer;
}
.body {
  width: 100%;
  height: 90%;
  padding: 1.5%;
  transform: translateY(-10%);
  border-radius: 30px 30px 0 0;
  background: linear-gradient(to top, rgb(246, 246, 246), rgb(252, 255, 252));
}
.search-box {
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.search-input {
  width: 97%;
  height: 80%;
  border: 1rpx solid rgb(245, 228, 109);
  border-radius: 50px;
  padding-left: 10%;
  font-size: 15px;
}
.search-icon {
  position: absolute;
  background: url('@/static/search.svg');
  background-size: contain;
  width: 4.5%;
  aspect-ratio: 1;
  left: 5%;
}
.search-button {
  position: absolute;
  width: 15%;
  height: 80%;
  border-radius: 50px;
  font-size: 15px;
  right: 1.5%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-button:hover {
  background: linear-gradient(to top right, rgb(238, 214, 32), rgb(245, 191, 109));
}
.search-button:active {
  background: rgb(238, 214, 32);
}
uni-button {
  background: linear-gradient(to top right, rgb(238, 221, 32), rgb(245, 191, 109));
}

uni-button:after {
  border: none;
}
.card-other {
  width: 100%;
  height: 45%;
  background-color: antiquewhite;
  border-radius: 11px;
  margin-bottom: 2%;
  margin-top: 1%;
}
.business-box {
  width: 100%;
  height: 90%;
  background-color: antiquewhite;
  border-radius: 11px;
  transition: transform ease 0.5s;
}
.business-list {
  width: 100%;
  height: 25%;
  border-radius: 11px;
  padding: 2%;
  margin-bottom: 2%;
  display: flex;
  flex-direction: column;
  background-color: white;
  cursor: pointer;
}
.business-list:active {
  background-color: rgb(245, 242, 242);
}
.body-scroll {
  width: 100%;
  height: 90%;
}
.item-up {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}
.up-img {
  width: 30%;
  height: 88%;
  border-radius: 5px;
  margin-left: 1%;
  margin-right: 1%;
}
.up-certificate {
  width: 8%;
  height: 14%;
  margin-right: 1%;
  background-color: black;
  transform: translateY(-278%);
  border-radius: 4px;
  background-color: rgb(235, 89, 56);
  color: white;
  font-size: 22rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.up-name {
  width: 55%;
  height: 25%;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
  font-size: 35rpx;
  font-weight: 1000;
  transform: translateY(-150%);
}
.up-samllTitle1 {
  position: absolute;
  width: 55%;
  height: 15%;
  left: 32%;
  top: 20%;
  font-size: 23rpx;
  color: #949191;
}
.up-samllTitle2 {
  position: absolute;
  width: 55%;
  height: 15%;
  left: 33%;
  top: 37%;
  font-size: 23rpx;
  color: #949191;
}
.up-samllTitle3 {
  position: absolute;
  width: 55%;
  height: 15%;
  right: -35%;
  top: 37%;
  font-size: 23rpx;
  color: #949191;
}
.item-down {
  width: 100%;
  height: 40%;
  background-color: aquamarine;
}
</style>
