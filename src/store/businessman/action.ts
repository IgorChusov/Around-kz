import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import  api  from '../../config/api'

import { RootState } from '../reducer'

// запрос отправлен
export const ALL_BUSINESSMEN_REQUEST = 'ALL_BUSINESSMEN_REQUEST'
export type AllBusinessmenRequestAction = {
  type: typeof ALL_BUSINESSMEN_REQUEST
}
export const allBusinessmenRequest: ActionCreator<AllBusinessmenRequestAction> = () => ({
  type: ALL_BUSINESSMEN_REQUEST,
})

// запрос смс успешен
export const ALL_BUSINESSMEN_SUCCESS = 'ALL_BUSINESSMEN_SUCCESS'
export type AllBusinessmenRequestSuccessAction = {
  type: typeof ALL_BUSINESSMEN_SUCCESS
  data: any
}

export const allBusinessmenRequestSuccess: ActionCreator<AllBusinessmenRequestSuccessAction> = (data: any) => ({
  type: ALL_BUSINESSMEN_SUCCESS,
  data
})


// запрос с ошибкой
export const ALL_BUSINESSMEN_ERROR = 'ALL_BUSINESSMEN_ERROR'
export type AllBusinessmenRequestErrorAction = {
  type: typeof ALL_BUSINESSMEN_ERROR
  error: string
}

export const allBusinessmenRequestError: ActionCreator<AllBusinessmenRequestErrorAction> = (error: string) => ({
  type: ALL_BUSINESSMEN_ERROR,
  error,
})

export const AllBusinessmenUserAsync = (): ThunkAction<void, RootState, unknown, Action<string>> =>
   async (dispatch) => {
      dispatch(allBusinessmenRequest())

      try {
        const resp = await api.post(`/users/businessmen/`)

        dispatch(allBusinessmenRequestSuccess(resp))

        return resp
      } catch (error: any) {
        dispatch(allBusinessmenRequestError(error.message))
      }
    }
