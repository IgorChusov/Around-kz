import { Reducer } from 'react'
import {  AccountMeChangeSuccessAction, AccountMeRequestAction, AccountMeRequestErrorAction, AccountMeRequestSuccessAction, ACCOUNT_ME_CHANGE_SUCCESS, ACCOUNT_ME_REQUEST, ACCOUNT_ME_REQUEST_ERROR, ACCOUNT_ME_REQUEST_SUCCESS } from './action'

type AccountActions = AccountMeRequestAction | 
  AccountMeRequestErrorAction | 
  AccountMeRequestSuccessAction | 
  AccountMeChangeSuccessAction;

export type IMe = {
  id: number
  username: string
  phone: string
  businessman: {id: number, title: string, questionnaire_type: string}[]
  address: string | null
  avatar: string | null
  status: string
  bank_card: string | null
  user_coordinates: {
    latitude: number | null,
    longitude: number | null
  }
}

export type TAccountState = {
  user: {
    loading: boolean
    error: string
    data: IMe
  }
}

const initialState = {
  user: {
    loading: false,
    error: '',
    data: {
      id: -1,
      username: '',
      phone: '',
      businessman: [],
      address: null,
      avatar:  null,
      status: '',
      bank_card: null,
      user_coordinates: {
        latitude: null,
        longitude: null,
      }
    },
  }
}

export const accountReducer: Reducer<TAccountState, AccountActions> = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_ME_REQUEST:
      return {
        ...state,
        user: {
          ...state.user, 
          loading: true,
        }
      }
    case ACCOUNT_ME_REQUEST_ERROR:
      return {
        ...state,
        user: {
          ...state.user, 
          error: action.error,
          loading: false,
        }
      }
    case ACCOUNT_ME_REQUEST_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user, 
          data: action.data,
          loading: false,
          error: ''
        }
      }
      case ACCOUNT_ME_CHANGE_SUCCESS:
        return {
          ...state,
          user: {
            ...state.user, 
            data: action.data,
          }
        }
    default:
      return state
  }
}
