<template>
  <view class="overtrue">
    <view class="head">
      <view class="address-box">
        <view class="address-icon"></view>
        <view class="address-text">鲸山云科技(珠海)有限公司</view>
        <view class="address-right"></view>
      </view>
    </view>
    <view class="body">
      <view class="search-box">
        <view class="search-icon"></view>
        <input placeholder="蛙来哒·牛蛙" class="search-input" />
        <button class="search-button">搜索</button>
      </view>
      <scroll-view class="body-scroll" scroll-y>
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
import { onShow } from '@dcloudio/uni-app'
import type { restaurant } from '@/types/restaurant'
import { useRestaurantStore } from '@/stores/modules/restaurant'
import { ref } from 'vue'

let businessList = ref<Array<restaurant>>()
const restaurantStore = useRestaurantStore()

onShow(() => {
  GetBusiness()
})

function GetBusiness() {
  uni
    .request({
      url: 'https://console-mock.apipost.cn/mock/2574b6b3-81e9-4929-9b74-a38530e92e3e/storeData?apipost_id=de11f7',
      method: 'GET',
    })
    .then((res: any) => {
      let data: { shopList: Array<restaurant> } = res.data.data
      businessList.value = data.shopList
    })
    .catch((err) => {
      console.log(err)
    })
}

function InRestaurant(item: restaurant) {
  restaurantStore.setProfile(item)
  restaurantStore.clearPrice()
  restaurantStore.clearMenu()

  uni.navigateTo({
    url: '/pages/content/index?id=' + item.mtWmPoiId,
    success: function (res) {
      res.eventChannel.emit('businessData', { data: item })
    },
  })
}
</script>

<style lang="scss" scoped>
.overtrue {
  height: 1624rpx;
  width: 750rpx;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  background-color: rgb(245, 228, 109);
  position: absolute;
  width: 20%;
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
  background-color: #000000;
  border-radius: 11px;
  transition: transform ease 0.5s;
}
.business-list {
  width: 100%;
  height: 20%;
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
  width: 200rpx;
  height: 200rpx;
  border-radius: 5px;
  margin-left: 1%;
  margin-right: 1%;
}
.up-certificate {
  width: 8%;
  height: 14%;
  margin-top: 2%;
  margin-left: 2%;
  margin-right: 2%;
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
  margin-top: 3%;
  width: 55%;
  height: 25%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 35rpx;
  font-weight: 900;
  transform: translateY(-150%);
}
.up-samllTitle1 {
  position: absolute;
  width: 55%;
  height: 15%;
  left: 33%;
  top: 25%;
  font-size: 23rpx;
  color: #949191;
}
.up-samllTitle2 {
  position: absolute;
  width: 55%;
  height: 15%;
  left: 33%;
  top: 40%;
  font-size: 23rpx;
  color: #949191;
}
.up-samllTitle3 {
  position: absolute;
  width: 55%;
  height: 15%;
  right: -35%;
  top: 40%;
  font-size: 23rpx;
  color: #949191;
}
.item-down {
  width: 100%;
  height: 40%;
  background-color: aquamarine;
}
</style>
