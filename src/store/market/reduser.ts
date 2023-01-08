import { Reducer } from 'react'


import {
  CreateMarketRequestAction, 
  CreateMarketRequestErrorAction, 
  CreateMarketRequestSuccessAction,
  GET_MARKET_REQUEST,
  CREATE_MARKET_ERROR, 
  CREATE_MARKET_REQUEST, 
  CREATE_MARKET_SUCCESS, 
  DeleteMarketRequestAction, 
  DeleteMarketRequestSuccessAction, 
  DELETE_MARKET_REQUEST,
  DELETE_MARKET_SUCCESS,
  GET_MARKET_SUCCESS,
  GET_MARKET_ERROR,
  GetMarketRequestAction,
  GetMarketRequestErrorAction,
  GetMarketRequestSuccessAction
} from './action'

type CreateMarketActions = 
  CreateMarketRequestAction 
  | CreateMarketRequestErrorAction 
  | CreateMarketRequestSuccessAction 
  | DeleteMarketRequestAction
  | DeleteMarketRequestSuccessAction
  | GetMarketRequestAction
  | GetMarketRequestErrorAction
  | GetMarketRequestSuccessAction
;

export type TMarketState = {
  loading: boolean
  error: string
  data: IMarketList
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
  id: number
  title: string
  description: string
  price: string
  unit:	string
  available_quantity: number
  min_quantity: number
  image: string 
  seller:	number
}

const initialState = {
  loading: false,
  error: '',
  data: {
    id: -1,
    title: '',
    description: '',
    price: '',
    unit:	'',
    available_quantity: -1,
    min_quantity: -1,
    image: '',
    seller:	-1,
  }
};

export const marketReducer: Reducer<TMarketState, CreateMarketActions> = (state=initialState, action) => {
  switch (action.type) {
    case GET_MARKET_REQUEST:
    case CREATE_MARKET_REQUEST:
    case DELETE_MARKET_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_MARKET_ERROR:
    case CREATE_MARKET_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case GET_MARKET_SUCCESS:
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
