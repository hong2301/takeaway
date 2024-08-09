<template>
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
        <image :src="item.picture" class="bilCard-item-img"></image>
        <view class="bilCard-item-name">{{ item.name }}</view>
        <view class="bilCard-item-price">¥{{ item.min_price }}</view>
        <view class="bilCard-item-sub" v-if="item.number" @click="BilSub(item, index)">-</view>
        <view class="bilCard-item-number" v-if="item.number">{{ item.number }}</view>
        <view class="bilCard-item-add" @click="BilAdd(item, index)">+</view>
      </view>
    </view>
  </view>
  <view class="film1" v-if="billBtn" @click="billBtn = false"></view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { commodityList, Spu } from '@/types/commodity'
import { useRestaurantStore } from '@/stores/modules/restaurant'
import { onHide } from '@dcloudio/uni-app'

const restaurantStore = useRestaurantStore()
let billCommodity = ref<Array<Spu>>([])
let showPrice = ref<string>('0')
let billBtn = ref<boolean>(false)
let commodityLists = ref<commodityList>([])
let clickCommodity = ref<Array<Spu>>([])
let price = ref<number>(0)

uni.$on('shopping', function (data: { price: number; commodityLists: commodityList }) {
  price.value = data.price
  showPrice.value = price.value.toFixed(2)
  commodityLists.value = data.commodityLists
})

function Communicate(){
  uni.$emit('shopping', {
    price: price.value,
    commodityLists: commodityLists.value,
  })
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
function Pay() {
  uni.navigateTo({
    url: '/pages/bill/index',
    success: function () {
      restaurantStore.setBailData(billCommodity.value)
      restaurantStore.setPrice(price.value)
    },
  })
}
function ClearBill() {
  billCommodity.value = []
  commodityLists.value?.forEach((item, index) => {
    item.forEach((item1, index1) => {
      item1.number = 0
    })
  })
  price.value = 0
  showPrice.value = '0'
  billBtn.value = false
  restaurantStore.setPrice(price.value)
  Communicate()
}
function BilAdd(item: Spu, index: number) {
  commodityLists.value[item.indexA][item.indexB].number++
  clickCommodity.value = commodityLists.value[item.indexA]
  price.value += item.min_price
  showPrice.value = price.value.toFixed(2)
  billCommodity.value[index].number++
  Communicate()
}
function BilSub(item: Spu, index: number) {
  commodityLists.value[item.indexA][item.indexB].number--
  clickCommodity.value = commodityLists.value[item.indexA]
  price.value -= item.min_price
  showPrice.value = price.value.toFixed(2)
  billCommodity.value[index].number--
  if (billCommodity.value[index].number === 0) {
    billCommodity.value.splice(index, 1)
  }
  if (billCommodity.value.length === 0) {
    billBtn.value = false
  }
  Communicate()
}
</script>

<style scoped lang="scss">
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
  cursor: pointer;
  z-index: 101;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
}
.settlement {
  cursor: pointer;
  font-size: 35rpx;
  font-weight: 500;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  width: 30%;
  height: 100%;
  background-color: rgb(255, 196, 86);
  border-radius: 0 50px 50px 0;
}
.bilCard {
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 60%;
  bottom: -60%;
  background-color: white;
  border-radius: 10px 10px 0 0;
  transition: transform ease 0.5s;
  padding-left: 2%;
  padding-right: 2%;
}
.bilCard-up {
  transform: translateY(-100%);
}
.bilCard-top {
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
}
.bilCard-text {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
}
.bilCard-clear {
  color: #949191;
  width: 20%;
  font-size: 28rpx;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.bilCard-item {
  width: 100%;
  height: 200rpx;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  position: relative;
  align-items: center;
}
.bilCard-item-box {
  width: 100%;
  height: 73%;
  overflow: auto;
}
.bilCard-item-img {
  width: 150rpx;
  height: 150rpx;
  border-radius: 10px;
}
.bilCard-item-name {
  margin-top: 10%;
  width: 60%;
  height: 25%;
  margin-left: 4%;
  margin-bottom: 24%;
  font-weight: 500;
  font-size: 35rpx;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 溢出隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
}
.bilCard-item-price {
  position: absolute;
  top: 63%;
  left: 27%;
  width: 15%;
  height: 25%;
  font-size: 40rpx;
  color: #ee4545;
}
.bilCard-item-add {
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
  top: 66%;
  right: 3%;
  cursor: pointer;
}
.bilCard-item-add:active {
  background-color: rgb(143, 114, 39);
}
.bilCard-item-sub {
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
  top: 66%;
  right: 20%;
  cursor: pointer;
}
.bilCard-item-number {
  position: absolute;
  width: 7%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 25rpx;
  font-weight: 900;
  top: 66%;
  right: 11.6%;
}
.film1 {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
</style>
