import axios, { AxiosError, AxiosResponseHeaders } from 'axios'
// import Cookies from "js-cookie";
import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import  api  from '../../config/api'

import EnvConfig from '../../config/env'
import { RootState } from '../reducer'

// запрос отправлен
export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export type RegisterRequestAction = {
  type: typeof REGISTER_REQUEST
}
export const registerRequest: ActionCreator<RegisterRequestAction> = () => ({
  type: REGISTER_REQUEST,
})

// запрос смс успешен
export const SMS_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS'
export type SmsRequestSuccessAction = {
  type: typeof SMS_REQUEST_SUCCESS
}

export const smsRequestSuccess: ActionCreator<SmsRequestSuccessAction> = () => ({
  type: SMS_REQUEST_SUCCESS,
})


// токен есть
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
export const TOKEN_REQUEST_ERROR = 'REGISTER_REQUEST_ERROR'
export type RegisterRequestErrorAction = {
  type: typeof TOKEN_REQUEST_ERROR
  error: string
}

export const registerRequestError: ActionCreator<RegisterRequestErrorAction> = (error: string) => ({
  type: TOKEN_REQUEST_ERROR,
  error,
})

export const RegisterUserAsync =
  (phone: string, username: string): ThunkAction<void, RootState, unknown, Action<string>> =>
   async (dispatch) => {
      dispatch(registerRequest())

      try {
        const resp = await api.post(`/users/register`, {
          phone: phone,
          username: username,
          'api_key': EnvConfig.apiKey
        })

        dispatch(smsRequestSuccess())

        return resp
      } catch (error: any) {
          if (
            error.response?.status === 400 &&
            error.response?.data?.phone?.includes('This number is already registered')
          ) {
            dispatch(registerRequestError('This number is already registered'))
          } else {
            dispatch(registerRequestError(error.message))
          }
      }
    }

export const LoginUserAsync = (phone: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    dispatch(registerRequest())
    try {
      const resp = await api.post(`/users/login`, 
        {
          phone: phone,
          password: '123456'
        },
        )

      dispatch(smsRequestSuccess())

      return resp
    } catch (error: any) { 
      dispatch(registerRequestError(error.message))
    }
  }

export const RegisterSmsActivateAsync =
(phone: string, username: string, code: string, ): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch) => {
    dispatch(registerRequest())
    api.post(`/users/register/sms`, {
        phone: phone,
        username: username,
        password: '123456',
        user_code: code,
      })
      .then((resp) => {
        dispatch(tokenRequestSuccess(resp.data.token))
        localStorage.setItem('token', resp.data.token)
      })
      .catch((error: AxiosError) => {
        dispatch(registerRequestError(error.message))
      })
}

export const LoginSmsActivateAsync =
(phone: string, code: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  (dispatch) => {
    dispatch(registerRequest())
    api.post(`/users/login/sms`, {
        phone: phone,
        password: '123456',
        user_code: code,
      })
      .then((resp) => {
        dispatch(tokenRequestSuccess(resp.data.access))
        localStorage.setItem('token', resp.data.access)
      })
      .catch((error: AxiosError) => {
        dispatch(registerRequestError(error.message))
      })
}
