import { Reducer } from 'react'

import { MeRequestAction, MeRequestErrorAction, MeRequestSuccessAction, ME_REQUEST, ME_REQUEST_ERROR, ME_REQUEST_SUCCESS } from './action'

type MeActions = 
  MeRequestAction 
  | MeRequestErrorAction 
  | MeRequestSuccessAction;

export type IMe = {
  id: number
  username: string
  phone: string
  businessman: any
  address: string | null
  avatar: string | null
  status: string
  bank_card: string | null
}

export type MeGetState = {
  loading: boolean
  error: string
  data: IMe
}

export const meGetReducer: Reducer<MeGetState, MeActions> = (state, action) => {
  switch (action.type) {
    case ME_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ME_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case ME_REQUEST_SUCCESS:
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
