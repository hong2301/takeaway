<template>
  <view class="search-content" v-if="toolbarType === 0">
    <view class="search-dishes" v-for="(com, index1) in searchItem" :key="index1">
      <image :src="com.picture" class="search-dishes-img"></image>
      <view class="search-dishes-name">{{ com.name }}</view>
      <view class="search-dishes-price">¥{{ com.min_price }}</view>
      <view class="search-dishes-sub" v-if="com.number" @click="Sub(com, index1)">-</view>
      <view class="search-dishes-number" v-if="com.number">{{ com.number }}</view>
      <view class="search-dishes-add" @click="Add(com, index1)">+</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { commodityList, Spu } from '@/types/commodity'
import { useRestaurantStore } from '@/stores/modules/restaurant'

let toolbarType = ref<number>(1)
let searchItem = ref<Array<Spu>>([])
let commodityLists = ref<commodityList>([])
let price = ref<number>(0)
const restaurantStore = useRestaurantStore()

uni.$on('toolbar', function (data) {
  toolbarType.value = data.type
  price.value = restaurantStore.price
})
uni.$on('searchData', function (data: { searchItem: Array<Spu>; commodityLists: commodityList }) {
  searchItem.value = data.searchItem
  commodityLists.value = data.commodityLists
})

function Sub(com: Spu, index: number) {
  price.value -= com.min_price
  commodityLists.value[com.indexA][com.indexB].number--
  uni.$emit('shopping', {
    price: price.value,
    commodityLists: commodityLists.value,
  })
}
function Add(com: Spu, index: number) {
  price.value += com.min_price
  commodityLists.value[com.indexA][com.indexB].number++
  uni.$emit('shopping', {
    price: price.value,
    commodityLists: commodityLists.value,
  })
}
</script>

<style scoped lang="scss">
.search-content {
  width: 750rpx;
  height: 1442.7616rpx;
}
.search-dishes {
  width: 100%;
  height: 200rpx;
  margin-bottom: 1px;
  align-items: center;
  display: flex;
  padding: 3%;
  position: relative;
}
.search-dishes-img {
  width: 160rpx;
  height: 160rpx;
  border-radius: 10px;
}
.search-dishes-name {
  width: 60%;
  height: 30%;
  margin-left: 5%;
  margin-bottom: 17%;
  font-weight: 500;
  font-size: 35rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.search-dishes-price {
  position: absolute;
  top: 70%;
  left: 30%;
  width: 15%;
  height: 25%;
  font-size: 30rpx;
  color: #ee4545;
}
.search-dishes-add {
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
  top: 64%;
  right: 3%;
  cursor: pointer;
}
.search-dishes-add:active {
  background-color: rgb(143, 114, 39);
}
.search-dishes-sub {
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
  top: 64%;
  right: 20%;
  cursor: pointer;
}
.search-dishes-number {
  position: absolute;
  width: 7%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 25rpx;
  font-weight: 900;
  top: 64%;
  right: 11.6%;
}
</style>
