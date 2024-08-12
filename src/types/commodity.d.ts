/** 菜单信息 */
export type Menu = {
  food_spu_tags: Array<MenuItem>
}

export type MenuItem = {
  icon: string
  name: string
  spus: Array<Spu>
}

export type Spu = {
  month_saled: number
  month_saled_content: string
  promotion: {
    activity_text: string
    addition_text: string
  }
  praise_num: number
  evaluate: string
  picture: string
  name: string
  originPrice: number
  min_price: number
  number: number | 0
  indexA: number
  indexB: number
  bookmark: string | ''
}

export type MeunSidebar = Array<MeunSidebarItem>

export type MeunSidebarItem = {
  name: string
  icon: string | ''
  active: Boolean | false
  sidebarMax: number | 0
  sidebarMin: number | 0
}

export type commodityList = Array<Array<Spu>>
