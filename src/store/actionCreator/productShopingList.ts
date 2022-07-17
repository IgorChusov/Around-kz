import { ActionCreator } from 'redux'

export type TProductListShopping = {
  id: string
  fullPrice: number
  name: string
  list?: {
    id: string
    nameProduct: string
    price: number
    amount: string
    unit: string
  }[]
}
export const PRODUCT_LIST_SHOPPING = 'PRODUCT_LIST_SHOPPING'
export type ProductListAction = {
  type: typeof PRODUCT_LIST_SHOPPING
  data: TProductListShopping
}
export const productListShopping: ActionCreator<ProductListAction> = (data: TProductListShopping) => ({
  type: PRODUCT_LIST_SHOPPING,
  data,
})
