<template>
  <view class="overtrue">
    <view class="navigation"></view>
    <view class="body">
      <view class="address-card">
        <view class="address-text">鲸山云科技(珠海)有限公司A座601</view>
        <view class="address-name">钟 先生</view>
        <view class="address-phone">13169614018</view>
        <view class="address-down">
          <view class="address-go">立即送出</view>
          <view class="address-will">大约10:30送达</view>
        </view>
      </view>
      <view class="pay-card">
        <view class="pay-name">{{ resName }}</view>
        <view class="pay-box">
          <view class="pay-item" v-for="(item, index) in dataList">
            <image :src="item.picture" class="pay-item-img"></image>
            <view class="pay-item-name">{{ item.name }}</view>
            <view class="pay-item-number">x{{ item.number }}</view>
            <view class="pay-item-price">¥{{ item.number * item.min_price }}</view>
          </view>
        </view>
        <view class="bigprice">小计 ¥
          <view class="bigprice-value">{{showPrice}}</view>
        </view>
      </view>
    </view>
    <view class="shoppingCart">
      <view class="shoppingCart-price">¥ {{ showPrice }}</view>
      <view class="shoppingCart-btn1">找人付</view>
      <view class="shoppingCart-btn2">去支付</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { onHide } from '@dcloudio/uni-app'
import { useRestaurantStore } from '@/stores/modules/restaurant'
import type { Spu } from '@/types/commodity'
const restaurantStore = useRestaurantStore()
let showPrice = ref<number>(0)
let resName = ref<string>()
let dataList = ref<Array<Spu>>()

onMounted(() => {
  console.log(123)
  console.log(restaurantStore.bailData)
  dataList.value = restaurantStore.bailData
  showPrice.value = restaurantStore.price
  resName.value = restaurantStore.profile?.shopName
})
onHide(() => {})
</script>

<style scoped lang="scss">
.overtrue {
  height: 1624rpx;
  width: 750rpx;
  position: relative;
  overflow: hidden;
  background-color: rgb(242, 242, 242);
}
.navigation {
  width: 100%;
  height: 11%;
  background-color: white;
}
.body {
  width: 100%;
  height: 81%;
  padding: 3%;
}
.address-card {
  width: 100%;
  height: 20%;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 5%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.address-text {
  width: 90%;
  height: 35%;
  font-size: 38rpx;
  font-weight: 500;
}
.address-name {
  width: 30%;
  height: 20%;
  font-size: 30rpx;
}
.address-phone {
  position: absolute;
  top: 38%;
  left: 26%;
  width: 30%;
  height: 20%;
  height: 20%;
  font-size: 30rpx;
}
.address-down {
  position: absolute;
  height: 40%;
  bottom: 0;
  width: 90%;
  border-top: 1px solid rgb(0, 0, 0, 0.05);
}
.address-go {
  position: absolute;
  width: 40%;
  height: 100%;
  font-size: 30rpx;
  display: flex;
  justify-content: left;
  align-items: center;
}
.address-will {
  position: absolute;
  width: 40%;
  height: 100%;
  right: -7%;
  display: flex;
  align-items: center;
  color: #007aff;
}
.pay-card {
  margin-top: 2%;
  width: 100%;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 4%;
}
.pay-name {
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
  width: 70%;
  height: 6%;
  font-size: 34rpx;
}
.pay-box {
  width: 100%;
  border-top: 1px solid rgb(0,0,0,0.05);
  border-bottom: 1px solid rgb(0,0,0,0.05);
}
.bigprice{
  margin-top: 5%;
  width: 100%;
  height: 15%;
  display: flex;
  margin-left: 10%;
  padding-left: 54%;
  align-items: center;
  font-size: 30rpx;
}
.bigprice-value{
  font-size: 50rpx;
  margin-left: 6%;
  margin-bottom: 3%;
}
.pay-item {
  width: 100%;
  height: 150rpx;
  display: flex;
  align-items: center;
  position: relative;
}
.pay-item-img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 10px;
}
.pay-item-name {
  width: 50%;
  height: 25%;
  margin-top: -12%;
  margin-left: 3%;
  font-size: 30rpx;
}
.pay-item-number {
  position: absolute;
  top: 70%;
  left: 21.7%;
  width: 6%;
  height: 20%;
  font-size: 27rpx;
}
.pay-item-price {
  display: flex;
  font-size: 38rpx;
  margin-top: -12%;
  margin-left: 8.5%;
  width: 20%;
  height: 35%;
}
.shoppingCart {
  display: flex;
  align-items: center;
  padding-left: 7%;
  color: white;
  position: absolute;
  width: 95%;
  height: 6.2%;
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  border-radius: 50px;
  z-index: 101;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
  justify-content: space-between;
}
.shoppingCart-price {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 20%;
  height: 100%;
}
.shoppingCart-btn1 {
  width: 25%;
  height: 100%;
  transform: translate(54%);
  background-color: rgb(71, 71, 71);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(246, 205, 101);
  cursor: pointer;
}
.shoppingCart-btn2 {
  cursor: pointer;
  color: rgb(71, 71, 71);
  width: 28%;
  height: 100%;
  background-color: rgb(246, 205, 101);
  border-radius: 0 50px 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
