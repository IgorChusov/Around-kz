import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import  api  from '../../../config/api'

import { RootState } from '../../reducer'

// запрос отправлен
export const ME_REQUEST = 'ME_REQUEST'
export type MeRequestAction = {
  type: typeof ME_REQUEST
}
export const meRequest: ActionCreator<MeRequestAction> = () => ({
  type: ME_REQUEST,
})

// успешно
export const ME_REQUEST_SUCCESS = 'ME_REQUEST_SUCCESS'
export type MeRequestSuccessAction = {
  type: typeof ME_REQUEST_SUCCESS
  data: string
}

export const meRequestSuccess: ActionCreator< MeRequestSuccessAction> = (data: any) => ({
  type: ME_REQUEST_SUCCESS,
  data,
})

// запрос с ошибкой
export const ME_REQUEST_ERROR = 'ME_REQUEST_ERROR'
export type MeRequestErrorAction = {
  type: typeof ME_REQUEST_ERROR
  error: string
}

export const meRequestError: ActionCreator<MeRequestErrorAction> = (error: string) => ({
  type: ME_REQUEST_ERROR,
  error,
})

export const MeGetUserAsync = (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => { 
    dispatch(meRequest())

    try {
      const resp = await api.get(`/users/me`)

      dispatch(meRequestSuccess(resp))

      return resp
    } catch (error: any) {
      dispatch(meRequestError(error))
    }
  }
