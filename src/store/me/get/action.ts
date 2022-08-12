import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import  api  from '../../../config/api'

import { RootState } from '../../reducer'
import { IMe } from './reduser'


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
  data: IMe
}

export const meRequestSuccess: ActionCreator< MeRequestSuccessAction> = (data: IMe) => ({
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

export const MeGetUserAsync = (token: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => { 
    dispatch(meRequest())

    try {
      const resp = await api.get(`/users/me`, {
        headers: {
        'Authorization': `JWT ${getState().token.tokenText || token}`
      }
      })
      dispatch(meRequestSuccess(resp.data))

      return resp
    } catch (error: any) {
      dispatch(meRequestError(error))
    }
  }
