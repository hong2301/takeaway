<template>提交订单</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { onHide } from '@dcloudio/uni-app'
import { useRestaurantStore } from '@/stores/modules/restaurant'

const restaurantStore = useRestaurantStore()

onMounted(() => {
  console.log(123)
  console.log(restaurantStore.bailData)
})
onHide(() => {})
</script>

<style scoped lang="scss"></style>
