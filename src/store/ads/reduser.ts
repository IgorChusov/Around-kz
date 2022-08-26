import { Reducer } from 'react'


import {
  CreateAdsRequestAction, 
  CreateAdsRequestErrorAction, 
  CreateAdsRequestSuccessAction,
  CREATE_ADS_ERROR, 
  CREATE_ADS_REQUEST, 
  CREATE_ADS_SUCCESS, 
  DeleteAdsRequestAction, 
  DeleteAdsRequestSuccessAction, 
  DELETE_ADS_REQUEST,
  DELETE_ADS_SUCCESS
} from './action'

type CreateAdsActions = 
  CreateAdsRequestAction 
  | CreateAdsRequestErrorAction 
  | CreateAdsRequestSuccessAction 
  | DeleteAdsRequestAction
  | DeleteAdsRequestSuccessAction
;

export type CreateAdsState = {
  loading: boolean
  error: string
  data: any
}

export interface IAdsList {

}

export const createAdsReducer: Reducer<CreateAdsState, CreateAdsActions> = (state, action) => {
  switch (action.type) {
    case CREATE_ADS_REQUEST:
    case DELETE_ADS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CREATE_ADS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case CREATE_ADS_SUCCESS:
    case DELETE_ADS_SUCCESS:
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
