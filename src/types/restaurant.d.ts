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
  scheme: string
}

export type restaurantMore = {
  poi_info: {
    name: string
    bulletin: string
    head_pic_url: string
    pic_url: string
    label_info: [
      {
        sctivity_id: number
        content: string
      },
    ]
    poi_label_new: {
      labels: [
        {
          label_url: string
          label_text: string
        },
      ]
    }
  }
}
