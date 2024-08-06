import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { restaurant } from '@/types/restaurant'

// 定义 Store
export const useRestaurantStore = defineStore(
  'restaurant',
  () => {
    const profile = ref<restaurant>()
    const price = ref<number>()
    const setProfile = (val: restaurant) => {
      profile.value = val
    }
    const setPrice = (val: number) => {
      price.value = val
    }

    const clearPrice = (val: number) => {
      price.value = undefined
    }

    const clearProfile = () => {
      profile.value = undefined
    }
    return {
      price,
      setPrice,
      clearPrice,
      profile,
      setProfile,
      clearProfile,
    }
  },
  {
    // 网页端配置
    // persist: true,
    // 小程序端配置
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
