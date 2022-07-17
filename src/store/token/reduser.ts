import { Reducer } from 'react'

import {
  TokenRequestAction,
  TokenRequestErrorAction,
  TokenRequestSuccessAction,
  TOKEN_REQUEST,
  TOKEN_REQUEST_ERROR,
  TOKEN_REQUEST_SUCCESS,
} from './action'

type TokenActions = TokenRequestAction | TokenRequestSuccessAction | TokenRequestErrorAction

export type TokenState = {
  loading: boolean
  error: string
  tokenText: string
}
export const tokenReducer: Reducer<TokenState, TokenActions> = (state, action) => {
  switch (action.type) {
    case TOKEN_REQUEST:
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
    case TOKEN_REQUEST_SUCCESS:
      return {
        ...state,
        tokenText: action.tokenText,
        loading: false,
      }
    default:
      return state
  }
}
