import { Reducer } from 'react'


import {
  CreateMarketRequestAction, 
  CreateMarketRequestErrorAction, 
  CreateMarketRequestSuccessAction,
  CREATE_MARKET_ERROR, 
  CREATE_MARKET_REQUEST, 
  CREATE_MARKET_SUCCESS, 
  DeleteMarketRequestAction, 
  DeleteMarketRequestSuccessAction, 
  DELETE_MARKET_REQUEST,
  DELETE_MARKET_SUCCESS
} from './action'

type CreateMarketActions = 
  CreateMarketRequestAction 
  | CreateMarketRequestErrorAction 
  | CreateMarketRequestSuccessAction 
  | DeleteMarketRequestAction
  | DeleteMarketRequestSuccessAction
;

export type TMarketState = {
  loading: boolean
  error: string
  data: IMarketList | null
}

export enum EMarketUnit {
  'piece', 
  'centimeter', 
  'meter', 
  'square meter', 
  'cubic meter', 
  'kilogram', 
  'gram'
}

export interface IMarketList {
  id: string
  title: string
  description: string
  price: string
  unit:	string
  quantity: number
  image: string 
  seller:	number
}


export const marketReducer: Reducer<TMarketState, CreateMarketActions> = (state, action) => {
  switch (action.type) {
    case CREATE_MARKET_REQUEST:
    case DELETE_MARKET_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CREATE_MARKET_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case CREATE_MARKET_SUCCESS:
    case DELETE_MARKET_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        error: ''
      }
    default:
      return state
  }
}
