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

type CreateAdsActions = CreateAdsRequestAction | 
  CreateAdsRequestErrorAction | 
  CreateAdsRequestSuccessAction | 
  DeleteAdsRequestAction | 
  DeleteAdsRequestSuccessAction;

export type TAdsState = {
  loading: boolean
  error: string
  data: any
}

const initialState = {
  loading: false,
  error: '',
  data: null,
};

export const adsReducer: Reducer<TAdsState, CreateAdsActions> = (state = initialState, action) => {
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
