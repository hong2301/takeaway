/** 餐厅信息 */
export type restaurant = {
  shopName: string
  monthSalesTip: string
  averagePriceTip: string
  minPriceTip: string
  shippingFeeTip: string
  deliveryTimeTip: string
  distance: string
  mtWmPoiId: number
  picUrl: string | ''
  ad_mark: boolean | false
  discounts2: Array<{ info: string; iconUrl: string; activityId: number }>
}
