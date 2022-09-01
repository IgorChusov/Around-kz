import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import api from '../../config/api'
import { ChangeBusinessmenSuccess } from '../businessman/get/action'
import { RootState } from '../reducer'

// запрос отправлен
export const CREATE_MARKET_REQUEST = 'CREATE_MARKET_REQUEST'
export type CreateMarketRequestAction = {
  type: typeof CREATE_MARKET_REQUEST
}
export const createMarketRequest: ActionCreator<CreateMarketRequestAction> = () => ({
  type: CREATE_MARKET_REQUEST,
})

// запрос на удаление отправлен
export const DELETE_MARKET_REQUEST = 'DELETE_MARKET_REQUEST'
export type DeleteMarketRequestAction = {
  type: typeof DELETE_MARKET_REQUEST
}
export const deleteMarketRequest: ActionCreator<DeleteMarketRequestAction> = () => ({
  type: DELETE_MARKET_REQUEST,
})

// запрос успешен
export const CREATE_MARKET_SUCCESS = 'CREATE_MARKET_SUCCESS'
export type CreateMarketRequestSuccessAction = {
  type: typeof CREATE_MARKET_SUCCESS
  data: any
}

export const createMarketSuccess: ActionCreator<CreateMarketRequestSuccessAction> = (data: any) => ({
  type: CREATE_MARKET_SUCCESS,
  data
})

// запрос удаления успешен
export const DELETE_MARKET_SUCCESS = 'DELETE_MARKET_SUCCESS'
export type DeleteMarketRequestSuccessAction = {
  type: typeof DELETE_MARKET_SUCCESS
  data: any
}

export const deleteMarketSuccess: ActionCreator<DeleteMarketRequestSuccessAction> = (data: any) => ({
  type: DELETE_MARKET_SUCCESS,
  data
})

// запрос с ошибкой
export const CREATE_MARKET_ERROR = 'CREATE_MARKET_ERROR'
export type CreateMarketRequestErrorAction = {
  type: typeof CREATE_MARKET_ERROR
  error: string
}

export const createMarketError: ActionCreator<CreateMarketRequestErrorAction> = (error: string) => ({
  type: CREATE_MARKET_ERROR,
  error,
})

export const CreateMarketAsync = (
  formData: FormData
): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(createMarketRequest())

    try {
      const resp = await api.post(`/market/products/`,
      formData,
      { 
        headers: {
        'Authorization': `JWT ${getState().token.tokenText}`,
      }})

      dispatch(createMarketSuccess(resp.data))

      const newData = getState().businessmen.data
      newData.product = [...newData.product, resp.data ]
      dispatch(ChangeBusinessmenSuccess(newData))

      return resp.data
    } catch (error: any) {
      dispatch(createMarketError(error.message))
    }
  }

  export const  ChangeMarketUserAsync = (
    formData: FormData,
    id: string
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch, getState) => {
      dispatch(createMarketRequest())
  
      try {
        const resp = await api.patch(`/market/products/${id}`,
        formData,
        { 
          headers: {
          'Authorization': `JWT ${getState().token.tokenText}`,
        }})
        
        dispatch(createMarketSuccess(resp.data))

        const newData = getState().businessmen.data
        const index = newData.product.findIndex((elem) => elem.id === resp.data.id)
        newData.product[index] = resp.data
        dispatch(ChangeBusinessmenSuccess(newData))
        return resp
      } catch (error: any) {
        dispatch(createMarketError(error.message))
      }
    }

  export const  DeleteMarketUserAsync = (
    id: string
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch, getState) => {
      dispatch(deleteMarketRequest())
  
      try {
        const resp = await api.delete(`/market/products/${id}`,
        { 
          headers: {
          'Authorization': `JWT ${getState().token.tokenText}`,
        }})
  
        dispatch(deleteMarketSuccess(resp.data))

        const newData = getState().businessmen.data
        const newProduct = newData.product.filter((elem) => String(elem.id) !== id)
        newData.product = newProduct
        
        dispatch(ChangeBusinessmenSuccess(newData))
        return resp
      } catch (error: any) {
        dispatch(createMarketError(error.message))
      }
  }
