import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { restaurant } from '@/types/restaurant'

// 定义 Store
export const useRestaurantStore = defineStore(
  'restaurant',
  () => {
    const profile = ref<restaurant>()

    const setProfile = (val: restaurant) => {
      profile.value = val
    }

    const clearProfile = () => {
      profile.value = undefined
    }
    return {
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
