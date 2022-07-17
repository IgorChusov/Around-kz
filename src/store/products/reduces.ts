import { Reducer } from 'react'

import {
  ProductRequestAction,
  ProductRequestErrorAction,
  ProductRequestSuccessAction,
  PRODUCT_REQUEST,
  PRODUCT_REQUEST_ERROR,
  PRODUCT_REQUEST_SUCCESS,
} from './action'

type ProductsActions = ProductRequestAction | ProductRequestSuccessAction | ProductRequestErrorAction

export type TDataProducts = {
  name: string
  idStore: string
  typeStore: string
  description: string
  list: {
    id: string
    nameProduct: string
    price: number
    min: number
    description: string
    img: string
    amountProduct: number
    unit: string
  }[]
}

export type ProductsState = {
  loading: boolean
  error: string
  data: TDataProducts
}
export const productsReducer: Reducer<ProductsState, ProductsActions> = (state, action) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case PRODUCT_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    default:
      return state
  }
}
