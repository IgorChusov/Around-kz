import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import api from '../../../config/api'
import { meRequestSuccess } from '../../me/get/action'
import { RootState } from '../../reducer'
import { IDataBusinessmen } from './reduser'


// запрос отправлен
export const GET_BUSINESSMEN_REQUEST = 'GET_BUSINESSMEN_REQUEST'
export type GetBusinessmenRequestAction = {
  type: typeof GET_BUSINESSMEN_REQUEST
}
export const getBusinessmenRequest: ActionCreator<GetBusinessmenRequestAction> = () => ({
  type: GET_BUSINESSMEN_REQUEST,
})

// запрос смс успешен
export const GET_BUSINESSMEN_SUCCESS = 'GET_BUSINESSMEN_SUCCESS'
export type GetBusinessmenRequestSuccessAction = {
  type: typeof GET_BUSINESSMEN_SUCCESS
  data: IDataBusinessmen
}

export const getBusinessmenSuccess: ActionCreator<GetBusinessmenRequestSuccessAction> = (data: IDataBusinessmen) => ({
  type: GET_BUSINESSMEN_SUCCESS,
  data
})


// добавление sevice
export const CHANGE_BUSINESSMEN_SUCCESS = 'CHANGE_BUSINESSMEN_SUCCESS'
export type ChangeBusinessmenSuccessAction = {
  type: typeof CHANGE_BUSINESSMEN_SUCCESS
  data: IDataBusinessmen
}

export const ChangeBusinessmenSuccess: ActionCreator<ChangeBusinessmenSuccessAction> = (data: IDataBusinessmen) => ({
  type: CHANGE_BUSINESSMEN_SUCCESS,
  data
})

// запрос с ошибкой
export const GET_BUSINESSMEN_ERROR = 'GET_BUSINESSMEN_ERROR'
export type GetBusinessmenRequestErrorAction = {
  type: typeof GET_BUSINESSMEN_ERROR
  error: string
}

export const getBusinessmenError: ActionCreator<GetBusinessmenRequestErrorAction> = (error: string) => ({
  type: GET_BUSINESSMEN_ERROR,
  error,
})

// запрос смс успешен
export const DELETE_BUSINESSMEN_SUCCESS = 'DELETE_BUSINESSMEN_SUCCESS'
export type DeleteBusinessmenRequestSuccessAction = {
  type: typeof DELETE_BUSINESSMEN_SUCCESS
  data: IDataBusinessmen
}

export const deleteBusinessmenSuccess: ActionCreator<DeleteBusinessmenRequestSuccessAction> = (data: IDataBusinessmen) => ({
  type: DELETE_BUSINESSMEN_SUCCESS,
  data
})

export const GetBusinessmenUserAsync = (id: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(getBusinessmenRequest())

    try {
      const resp = await api.get(`/users/businessmen/${id}`)

      dispatch(getBusinessmenSuccess(resp.data))

      return resp.data
    } catch (error: any) {
      dispatch(getBusinessmenError(error.message))
    }
  }


export const DeleteBusinessmenUserAsync = (id: string): ThunkAction<void, RootState, unknown, Action<string>> =>
async (dispatch, getState) => {
  dispatch(getBusinessmenRequest())

  try {
    const resp = await api.delete(`/users/businessmen/${id}`, {
      headers: {
        'Authorization': `JWT ${getState().token.tokenText}`
      }
    })

    dispatch(getBusinessmenSuccess(null))
    const deletedElement = getState().me.data
    const data = deletedElement.businessman.filter((elem) => String(elem.id) !== id)
    deletedElement.businessman = data
    dispatch(meRequestSuccess(deletedElement))
    
    return null
  } catch (error: any) {
    dispatch(getBusinessmenError(error.message))
  }
}
