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
        <input placeholder="蛙来哒·牛蛙" class="search-input" @input="Cin" />
        <button class="search-button" @click="Search">搜索</button>
      </view>
      <scroll-view class="body-scroll" scroll-y>
        <view class="icon-box">
          <view class="icon-box-up">
            <view class="icon-box-up-item" v-for="(item, index) in iconDataUP" :key="index">
              <image class="icon-box-up-item-img" :src="item.icon"></image>
              <view class="icon-box-up-item-text">{{ item.name }}</view>
            </view>
          </view>
          <view class="icon-box--down">
            <view class="icon-box-down-item" v-for="(item, index) in iconDataDown" :key="index">
              <image class="icon-box-down-item-img" :src="item.icon"></image>
              <view class="icon-box-down-item-text">{{ item.name }}</view>
            </view>
          </view>
        </view>
        <view class="sorry" v-if="businessList?.length === 0">抱歉没有商家信息</view>
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
            <view class="up-label">
              <view class="up-label-item" v-for="(item1, index1) in item.discounts2" :key="index1">
                <image
                  class="up-label-item-icon"
                  :src="item1.iconUrl"
                  v-if="item1.iconUrl !== ''"
                ></image>
                <view
                  class="up-label-item-text"
                  :class="[
                    item1.activityId === 2 ? 'up-label-item-text-reduction' : '',
                    item1.activityId === 17 ? 'up-label-item-text-discount' : '',
                  ]"
                  >{{ item1.info }}</view
                >
              </view>
            </view>
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
let inputStr: string = ''
let iconData: Array<{ icon: string; name: string }> = []
let iconDataUP = ref<Array<{ icon: string; name: string }>>()
let iconDataDown = ref<Array<{ icon: string; name: string }>>()

onShow(() => {
  GetBusiness()
  GetIcon()
})

function GetIcon() {
  uni
    .request({
      url: 'https://console-mock.apipost.cn/mock/2574b6b3-81e9-4929-9b74-a38530e92e3e/homeData?apipost_id=df8048',
      method: 'GET',
    })
    .then((res: any) => {
      let temp: { kingkongList: Array<{ icon: string; name: string }> } = res.data.data
      iconData = temp.kingkongList
      iconDataUP.value = iconData.splice(0, 5)
      iconDataDown.value = iconData.splice(5)
    })
    .catch((err) => {
      console.log(err)
    })
}

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

function Cin(value: { detail: { value: string } }) {
  inputStr = value.detail.value
  if (inputStr.length === 0) {
    GetBusiness()
  }
}
function Search() {
  let businessListTemp: Array<restaurant> = []
  businessList.value?.forEach((item) => {
    if (item.shopName.includes(inputStr)) {
      businessListTemp.push(item)
    }
  })
  businessList.value = businessListTemp
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
  z-index: 10;
}
//.search-button:hover {
//  background: linear-gradient(to top right, rgb(238, 214, 32), rgb(245, 191, 109));
//}
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
}
.up-label {
  position: absolute;
  width: 67%;
  height: 35%;
  right: 0;
  top: 58%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.up-label-item {
  display: flex;
  height: 45%;
  margin-right: 4%;
}
.up-label-item-icon {
  width: 34rpx;
  height: 34rpx;
}
.up-label-item-text {
  height: 100%;
  font-size: 20rpx;
  transform: translate(2%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
}
.up-label-item-text-discount {
  border: 1px solid rgba(231, 63, 63, 0.5);
  color: #ee5a5a;
}
.up-label-item-text-reduction {
  border: 1px solid rgba(231, 217, 63, 0.5);
  color: #ee985a;
}
.item-down {
  width: 100%;
  height: 40%;
  background-color: aquamarine;
}
.sorry {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-box {
  width: 100%;
  height: 30%;
  margin-top: 2%;
  margin-bottom: 3%;
}
.icon-box-up {
  width: 100%;
  height: 40%;
  display: flex;
}
.icon-box-up-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 187.5rpx;
  height: 100%;
  cursor: pointer;
}
.icon-box-up-item-img {
  width: 110rpx;
  height: 110rpx;
}
.icon-box-up-item-text {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-box--down {
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.icon-box-down-item {
  width: 100rpx;
  aspect-ratio: 1;
  margin: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.icon-box-down-item-img {
  width: 70rpx;
  height: 70rpx;
}
.icon-box-down-item-text {
  width: 100%;
  height: 30%;
  transform: translateY(50%);
  font-size: 25rpx;
  padding-left: 2%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
