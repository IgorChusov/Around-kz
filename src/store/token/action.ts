import  { AxiosError } from 'axios'
import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import  api  from '../../config/api'

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
  (data: {phone: string, username: string}): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
      dispatch(registerRequest())

      try {
        const resp = await api.post(`/users/register`, data)

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

export const LoginUserAsync = (data: {phone: string}): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    dispatch(registerRequest())
    try {
      const resp = await api.post(`/users/login`, 
        {
          phone: data.phone,
          password: '123456'
        },
        )

      dispatch(smsRequestSuccess())

      return resp
    } catch (error: any) { 
      if(error.response?.data?.phone[0]) {
        dispatch(registerRequestError(error.response?.data?.phone[0]))
      } else {
        dispatch(registerRequestError(error.message))
      }  
    }
  }

export const RegisterSmsActivateAsync =
(phone: string, username: string, code: string, coordinates: [number, number] ): ThunkAction<void, RootState, unknown, Action<string>> =>
 async (dispatch) => {
    dispatch(registerRequest())
    try {
      const respRegister = await api.post(`/users/register/sms`, {
        phone: phone,
        username: username,
        user_code: code,
        user_coordinates: coordinates
      })

      const respToken = await api.post(`/users/token`, {
        phone: phone,
        username: username,
        user_code: code,
        password: '12345'
      })
        dispatch(tokenRequestSuccess(respToken.data))
        localStorage.setItem('token', 'true')
    } catch (error: any) {
      dispatch(registerRequestError(error.message))
    }
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
        dispatch(tokenRequestSuccess(resp.data))
        localStorage.setItem('token', 'true')
      })
      .catch((error: AxiosError) => {
        dispatch(registerRequestError(error.message))
      })
}

export const RefreshTokenAsync =
(): ThunkAction<void, RootState, unknown, Action<string>> =>
 async (dispatch) => {
    try {
      dispatch(registerRequest())

      const resp = await api.post(`/users/token/refresh`)

      dispatch(tokenRequestSuccess(resp.data.access))
      localStorage.setItem('token', 'true')
    } catch (error: any) {
      localStorage.removeItem('token')
      dispatch(registerRequestError(error?.message))
    }
}
