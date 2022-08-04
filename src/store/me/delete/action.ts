import { Action, ActionCreator } from "redux"
import { ThunkAction } from "redux-thunk"
import api from "../../../config/api"
import { RootState } from "../../reducer"

// запрос на удаление отправлен
export const ME_DELETE_REQUEST = 'ME_DELETE_REQUEST'
export type MeDeleteRequestAction = {
  type: typeof ME_DELETE_REQUEST
}
export const meDeleteRequest: ActionCreator<MeDeleteRequestAction> = () => ({
  type: ME_DELETE_REQUEST,
})

// успешно
export const ME_DELETE_SUCCESS = 'ME_DELETE_SUCCESS'
export type MeDeleteSuccessAction = {
  type: typeof ME_DELETE_SUCCESS
}

export const meDeleteSuccess: ActionCreator<MeDeleteSuccessAction> = () => ({
  type: ME_DELETE_SUCCESS,
})

// запрос с ошибкой
export const ME_DELETE_ERROR = 'ME_DELETE_ERROR'
export type MeDeleteErrorAction = {
  type: typeof ME_DELETE_ERROR
  error: string
}

export const meDeleteError: ActionCreator<MeDeleteErrorAction> = (error: string) => ({
  type: ME_DELETE_ERROR,
  error,
})

export const MeDeleteUserAsync = ({}): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => { 
    dispatch(meDeleteRequest())
    try {
      const resp = await api.put(`/users/me`, {
      })
      dispatch(meDeleteSuccess())
      return resp
    } catch (error: any) {
      dispatch(meDeleteError(error))
    }
  }
  