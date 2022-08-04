import { Action, ActionCreator } from "redux"
import { ThunkAction } from "redux-thunk"
import api from "../../../config/api"
import { RootState } from "../../reducer"

// запрос на изменение отправлен
export const ME_PATCH_REQUEST = 'ME_PATCH_REQUEST'
export type MePatchRequestAction = {
  type: typeof ME_PATCH_REQUEST
}
export const mePatchRequest: ActionCreator<MePatchRequestAction> = () => ({
  type: ME_PATCH_REQUEST,
})

// успешно
export const ME_PATCH_SUCCESS = 'ME_PATCH_SUCCESS'
export type MePatchSuccessAction = {
  type: typeof ME_PATCH_SUCCESS
  data: string
}

export const mePatchSuccess: ActionCreator<MePatchSuccessAction> = (data: any) => ({
  type: ME_PATCH_SUCCESS,
  data,
})

// запрос с ошибкой
export const ME_PATCH_ERROR = 'ME_PUT_ERROR'
export type MePatchErrorAction = {
  type: typeof ME_PATCH_ERROR
  error: string
}

export const mePatchError: ActionCreator<MePatchErrorAction> = (error: string) => ({
  type: ME_PATCH_ERROR,
  error,
})

export const MePatchUserAsync = ({}): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => { 
    dispatch(mePatchRequest())
    try {
      const resp = await api.put(`/users/me`, {
      })
      dispatch(mePatchSuccess(resp))
      return resp
    } catch (error: any) {
        dispatch(mePatchError(error))
    }
  }
