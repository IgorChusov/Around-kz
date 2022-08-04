import { Action, ActionCreator } from "redux"
import { ThunkAction } from "redux-thunk"
import api from "../../../config/api"
import { RootState } from "../../reducer"

// запрос на создание отправлен
export const ME_PUT_REQUEST = 'ME_PUT_REQUEST'
export type MePutRequestAction = {
  type: typeof ME_PUT_REQUEST
}
export const mePutRequest: ActionCreator<MePutRequestAction> = () => ({
  type: ME_PUT_REQUEST,
})

// успешно
export const ME_PUT_SUCCESS = 'ME_PUT_SUCCESS'
export type MePutSuccessAction = {
  type: typeof ME_PUT_SUCCESS
  data: string
}

export const mePutSuccess: ActionCreator<MePutSuccessAction> = (data: any) => ({
  type: ME_PUT_SUCCESS,
  data,
})

// запрос с ошибкой
export const ME_PUT_ERROR = 'ME_PUT_ERROR'
export type MePutErrorAction = {
  type: typeof ME_PUT_ERROR
  error: string
}

export const mePutError: ActionCreator<MePutErrorAction> = (error: string) => ({
  type: ME_PUT_ERROR,
  error,
})

export const MePutUserAsync = ({}): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => { 
    dispatch(mePutRequest())
    try {
      const resp = await api.put(`/users/me`, {
      })
      dispatch(mePutSuccess(resp))
      return resp
    } catch (error: any) {
        dispatch(mePutError(error))
    }
  }
