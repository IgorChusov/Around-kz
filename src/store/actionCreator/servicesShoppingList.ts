import { ActionCreator } from 'redux'

export type TServicesListShopping = {
  id: string
  date: string
  time: string
  fullPrice: number
  list?: {
    id: string
    nameService: string
    price: number
  }[]
}
export const SERVICES_LIST_SHOPPING = 'SERVICES_LIST_SHOPPING'
export type ServicesListAction = {
  type: typeof SERVICES_LIST_SHOPPING
  data: TServicesListShopping
}
export const servicesListShopping: ActionCreator<ServicesListAction> = (data: TServicesListShopping) => ({
  type: SERVICES_LIST_SHOPPING,
  data,
})
