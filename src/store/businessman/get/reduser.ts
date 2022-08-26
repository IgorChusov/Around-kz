import { Reducer } from 'react'

import {
  GetBusinessmenRequestAction, 
  GetBusinessmenRequestErrorAction, 
  GetBusinessmenRequestSuccessAction,
  GET_BUSINESSMEN_ERROR, 
  GET_BUSINESSMEN_REQUEST, 
  GET_BUSINESSMEN_SUCCESS,
  CHANGE_BUSINESSMEN_SUCCESS,
  ChangeBusinessmenSuccessAction
} from './action'

type TGetBusinessmenActions = 
  GetBusinessmenRequestAction 
  | GetBusinessmenRequestErrorAction 
  | GetBusinessmenRequestSuccessAction 
  | ChangeBusinessmenSuccessAction

export interface IDataBusinessmen {
  id: number,
  tags: string [],
  images_service: string[],
  service: {
    id: number
    description: string
    price: string
    title: string
  }[],
  product:[],
  rule_payment: string,
  title: string,
  description: string,
  questionnaire_type: string,
  address: string,
  date_create: Date | null,
  date_update: Date | null,
  icon: null,
  type_booking: string,
  time_bring:null,
  time_end_of_applications: null,
  home_service:false,
  user_service:false,
  user: number
}

export type TGetBusinessmenState = {
  loading: boolean
  hasLoading: boolean
  error: string
  data: IDataBusinessmen
}

export const getBusinessmenReducer: Reducer<TGetBusinessmenState, TGetBusinessmenActions> = (state, action) => {
  switch (action.type) {
    case GET_BUSINESSMEN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_BUSINESSMEN_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case GET_BUSINESSMEN_SUCCESS:
    case CHANGE_BUSINESSMEN_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        hasLoading: true,
        error: ''
      }
    default:
      return state
  }
}
