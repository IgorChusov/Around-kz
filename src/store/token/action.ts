import axios, { AxiosError, AxiosResponseHeaders } from 'axios'
// import Cookies from "js-cookie";
import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'

import EnvConfig from '../../config/env'
import { RootState } from '../reducer'

// запрос отправлен
export const TOKEN_REQUEST = 'TOKEN_REQUEST'
export type TokenRequestAction = {
  type: typeof TOKEN_REQUEST
}
export const tokenRequest: ActionCreator<TokenRequestAction> = () => ({
  type: TOKEN_REQUEST,
})

// запрос успешен
export const TOKEN_REQUEST_SUCCESS = 'TOKEN_REQUEST_SUCCESS'
export type TokenRequestSuccessAction = {
  type: typeof TOKEN_REQUEST_SUCCESS
  tokenText: string
}
export const tokenRequestSuccess: ActionCreator<TokenRequestSuccessAction> = (tokenText: string) => ({
  type: TOKEN_REQUEST_SUCCESS,
  tokenText,
})

// запрос с ошибкой
export const TOKEN_REQUEST_ERROR = 'TOKEN_REQUEST_ERROR'
export type TokenRequestErrorAction = {
  type: typeof TOKEN_REQUEST_ERROR
  error: string
}

export const tokenRequestError: ActionCreator<TokenRequestErrorAction> = (error: string) => ({
  type: TOKEN_REQUEST_ERROR,
  error,
})

export interface IResponseLogin {}

export const RegisterUserAsync =
  (phone: string, username: string): ThunkAction<void, RootState, unknown, Action<string>> =>
    (dispatch, getState) => {
      dispatch(tokenRequest)
      axios
        .post(`${EnvConfig.apiUrl}/users/register`, {
          phone: phone,
          username: username,
        })
        .then((resp) => {
        // Cookies.set('token', , { expires: 365 })
          console.log(resp)
        // dispatch(LoginUserAsync(phone));
        })
        .catch((error: AxiosError) => {
          if (
            error.response?.status === 400 &&
          error.response?.data?.phone?.includes('This number is already registered')
          ) {
            dispatch(LoginUserAsync(phone))
          } else {
            dispatch(tokenRequestError(error))
          }
        })
    }

export const LoginUserAsync =
  (phone: string): ThunkAction<void, RootState, unknown, Action<string>> =>
    (dispatch) => {
      dispatch(tokenRequest)
      axios
        .post(`${EnvConfig.apiUrl}/users/login`, {
          phone: phone,
          password: '123456',
        })
        .then((resp) => {
          dispatch(tokenRequestSuccess(resp.data.access))
        })
        .catch((error) => {
          dispatch(tokenRequestError(error))
        })
    }
