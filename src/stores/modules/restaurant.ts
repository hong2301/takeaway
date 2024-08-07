import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { restaurant } from '@/types/restaurant'
import type { commodityList } from '@/types/commodity'

// 定义 Store
export const useRestaurantStore = defineStore(
  'restaurant',
  () => {
    const profile = ref<restaurant>()
    const price = ref<number>()
    const menu = ref<commodityList>()
    const sidebarType = ref<number>()
    const setSidebarType = (val: number) => {
      sidebarType.value = val
    }
    const clearSidebarType = (val: number) => {
      sidebarType.value = 0
    }
    const setProfile = (val: restaurant) => {
      profile.value = val
    }
    const clearProfile = () => {
      profile.value = undefined
    }

    const setPrice = (val: number) => {
      price.value = val
    }
    const clearPrice = () => {
      price.value = 0
    }

    const setMenu = (val: commodityList) => {
      menu.value = val
    }
    const clearMenu = () => {
      menu.value = undefined
    }

    return {
      price,
      setPrice,
      clearPrice,
      profile,
      setProfile,
      clearProfile,
      menu,
      setMenu,
      clearMenu,
      sidebarType,
      setSidebarType,
      clearSidebarType,
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
