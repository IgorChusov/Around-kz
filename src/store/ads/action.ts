import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import api from '../../config/api'
import { SwiperDate } from '../../shared/ContainerContent/PageService/ChoiceOfDate/SwiperDate'
import { RootState } from '../reducer'


// запрос отправлен
export const CREATE_ADS_REQUEST = 'CREATE_ADS_REQUEST'
export type CreateAdsRequestAction = {
  type: typeof CREATE_ADS_REQUEST
}
export const createAdsRequest: ActionCreator<CreateAdsRequestAction> = () => ({
  type: CREATE_ADS_REQUEST,
})

// запрос смс успешен
export const CREATE_ADS_SUCCESS = 'CREATE_ADS_SUCCESS'
export type CreateAdsRequestSuccessAction = {
  type: typeof CREATE_ADS_SUCCESS
  data: any
}

export const createAdsSuccess: ActionCreator<CreateAdsRequestSuccessAction> = (data: any) => ({
  type: CREATE_ADS_SUCCESS,
  data
})


// запрос с ошибкой
export const CREATE_ADS_ERROR = 'CREATE_ADS_ERROR'
export type CreateAdsRequestErrorAction = {
  type: typeof CREATE_ADS_ERROR
  error: string
}

export const createAdsError: ActionCreator<CreateAdsRequestErrorAction> = (error: string) => ({
  type: CREATE_ADS_ERROR,
  error,
})

export const CreateAdsUserAsync = (
  title: string,
  description: string,
  price: string,
  master: string

): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => {
    dispatch(createAdsRequest())

    try {
      const resp = await api.post(`/ads/services/`,
      {
        title, 
        description,
        price,
        master
      },
      { 
        headers: {
        'Authorization': `JWT ${getState().token.tokenText}`,
      }})

      dispatch(createAdsSuccess(resp.data))

      return resp
    } catch (error: any) {
      dispatch(createAdsError(error.message))
    }
  }

  export const  ChangeAdsUserAsync = (
    title: string,
    description: string,
    price: string,
    id: string
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch, getState) => {
      dispatch(createAdsRequest())
  
      try {
        const resp = await api.patch(`/ads/services/${id}`,
        {
          title, 
          description,
          price,
        },
        { 
          headers: {
          'Authorization': `JWT ${getState().token.tokenText}`,
        }})
  
        dispatch(createAdsSuccess(resp.data))
  
        return resp
      } catch (error: any) {
        dispatch(createAdsError(error.message))
      }
    }

  export const  DeleteAdsUserAsync = (
    id: string
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
    async (dispatch, getState) => {
      dispatch(createAdsRequest())
  
      try {
        const resp = await api.delete(`/ads/services/${id}`,
        { 
          headers: {
          'Authorization': `JWT ${getState().token.tokenText}`,
        }})
  
        dispatch(createAdsSuccess(resp.data))
  
        return resp
      } catch (error: any) {
        dispatch(createAdsError(error.message))
      }
  }
