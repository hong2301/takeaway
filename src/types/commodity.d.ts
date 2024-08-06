/** 菜单信息 */
export type Menu = Array<MenuItem>

export type MenuItem = {
  icon: string
  name: string
  spus: Array<Spu>
}

export type Spu = {
  picture: string
  name: string
  min_price: number
}
