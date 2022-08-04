import { Reducer } from 'react'

import {
  AllBusinessmenRequestAction,
  AllBusinessmenRequestErrorAction,
  AllBusinessmenRequestSuccessAction,
  ALL_BUSINESSMEN_ERROR,
  ALL_BUSINESSMEN_REQUEST,
  ALL_BUSINESSMEN_SUCCESS,
} from './action'

type AllBusinessmenActions = 
  AllBusinessmenRequestAction 
  | AllBusinessmenRequestErrorAction 
  | AllBusinessmenRequestSuccessAction 
;

export type AllBusinessmenState = {
  loading: boolean
  error: string
  data: any
}

export const allBusinessmenReducer: Reducer<AllBusinessmenState, AllBusinessmenActions> = (state, action) => {
  switch (action.type) {
    case ALL_BUSINESSMEN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ALL_BUSINESSMEN_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case ALL_BUSINESSMEN_SUCCESS:
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
