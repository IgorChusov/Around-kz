import { Reducer } from 'react'

import {
  ServicesRequestAction,
  ServicesRequestErrorAction,
  ServicesRequestSuccessAction,
  SERVICES_REQUEST,
  SERVICES_REQUEST_ERROR,
  SERVICES_REQUEST_SUCCESS,
} from './action'

type ServicesActions = ServicesRequestAction | ServicesRequestSuccessAction | ServicesRequestErrorAction

export type TDataServices = {
  idService: string
  list: { id: string; nameService: string; price: number; checked: boolean }[]
}
export type ServicesState = {
  loading: boolean
  error: string
  data: TDataServices
}
export const servicesReducer: Reducer<ServicesState, ServicesActions> = (state, action) => {
  switch (action.type) {
    case SERVICES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SERVICES_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case SERVICES_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    default:
      return state
  }
}
