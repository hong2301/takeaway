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
  picture: string
  name: string
  min_price: number
  number: number | 0
}

export type MeunSidebar = Array<MeunSidebarItem>
export type MeunSidebarItem = {
  name: string
  icon: string | ''
  active: Boolean | false
}

export type commodityList = Array<Array<Spu>>
