import { Reducer } from 'react'

import { MePutErrorAction, MePutRequestAction, MePutSuccessAction, ME_PUT_ERROR, ME_PUT_REQUEST, ME_PUT_SUCCESS } from './action'

type MeActions = 
  MePutRequestAction
  | MePutSuccessAction
  | MePutErrorAction;

export type MePutState = {
  loading: boolean
  error: string
  data: any
}

export const mePutReducer: Reducer<MePutState, MeActions> = (state, action) => {
  switch (action.type) {
    case ME_PUT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ME_PUT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case ME_PUT_SUCCESS:
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
