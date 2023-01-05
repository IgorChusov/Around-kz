import { Reducer } from 'react'

import {
  RegisterRequestAction,
  RegisterRequestErrorAction,
  SmsRequestSuccessAction,
  TokenRequestSuccessAction,
  REGISTER_REQUEST,
  TOKEN_REQUEST_ERROR,
  TOKEN_REQUEST_SUCCESS,
  SMS_REQUEST_SUCCESS,
} from './action'

type SessionActions = RegisterRequestAction 
  | RegisterRequestErrorAction 
  | TokenRequestSuccessAction 
  | SmsRequestSuccessAction;

export type TSessionState = {
  loading: boolean
  error: string
  tokenText: string
}

const initialState = {
  loading: false,
  error: '',
  tokenText: ''
}

export const sessionReducer: Reducer<TSessionState, SessionActions> = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case TOKEN_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case SMS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      }
    case TOKEN_REQUEST_SUCCESS:
      return {
        ...state,
        tokenText: action.tokenText,
        loading: false,
        error: ''
      }
    default:
      return state
  }
}
