import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import api from '../../config/api'
import { ChangeBusinessmenSuccess, getBusinessmenSuccess } from '../businessman/action'
import { RootState } from '../reducer'

// запрос на получение отправлен
export const GET_MARKET_REQUEST = 'GET_MARKET_REQUEST'
export type GetMarketRequestAction = {
  type: typeof GET_MARKET_REQUEST
}
export const getMarketRequest: ActionCreator<GetMarketRequestAction> = () => ({
  type: GET_MARKET_REQUEST,
})

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

// запрос на получение успешен
export const GET_MARKET_SUCCESS = 'GET_MARKET_SUCCESS'
export type GetMarketRequestSuccessAction = {
  type: typeof GET_MARKET_SUCCESS
  data: any
}

export const getMarketSuccess: ActionCreator<GetMarketRequestSuccessAction> = (data: any) => ({
  type: GET_MARKET_SUCCESS,
  data
})

// запрос на создание успешен
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

// запрос создания с ошибкой
export const CREATE_MARKET_ERROR = 'CREATE_MARKET_ERROR'
export type CreateMarketRequestErrorAction = {
  type: typeof CREATE_MARKET_ERROR
  error: string
}

export const createMarketError: ActionCreator<CreateMarketRequestErrorAction> = (error: string) => ({
  type: CREATE_MARKET_ERROR,
  error,
})
// запрос получения с ошибкой
export const GET_MARKET_ERROR = 'GET_MARKET_ERROR'
export type GetMarketRequestErrorAction = {
  type: typeof GET_MARKET_ERROR
  error: string
}

export const getMarketError: ActionCreator<GetMarketRequestErrorAction> = (error: string) => ({
  type: GET_MARKET_ERROR,
  error,
})

export const LoadMarketAsync = (id: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    dispatch(getMarketRequest())

    try {
      const resp = await api.get(`/market/products/${id}`)

      dispatch(getMarketSuccess(resp.data))

      return resp.data
    } catch (error: any) {
      dispatch(getMarketError(error.message))
    }
  }

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
        'Authorization': `JWT ${getState().session.tokenText}`,
      }})

      dispatch(createMarketSuccess(resp.data))

      const newData = getState().businessmen.myBusinessmen.data
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
          'Authorization': `JWT ${getState().session.tokenText}`,
        }})
        
        dispatch(createMarketSuccess(resp.data))

        const newData = getState().businessmen.myBusinessmen.data
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
          'Authorization': `JWT ${getState().session.tokenText}`,
        }})
  
        dispatch(deleteMarketSuccess(resp.data))

        const newData = getState().businessmen.myBusinessmen.data
        const newProduct = newData.product.filter((elem) => String(elem.id) !== id)
        newData.product = newProduct
        
        dispatch(ChangeBusinessmenSuccess(newData))
        return resp
      } catch (error: any) {
        dispatch(createMarketError(error.message))
      }
  }
