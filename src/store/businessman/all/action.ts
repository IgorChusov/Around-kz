import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import  api  from '../../../config/api'

import { RootState } from '../../reducer'

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

// интервалы для расписания
// запрос отправлен создание интервала
export const CREATE_INTERVALS_REQUEST = 'CREATE_INTERVALS_REQUEST'
export type CreateIntervalsRequestAction = {
  type: typeof CREATE_INTERVALS_REQUEST
}
export const createIntervalsRequest: ActionCreator<CreateIntervalsRequestAction> = () => ({
  type: CREATE_INTERVALS_REQUEST,
})

// запрос успешен 
export const CREATE_INTERVALS_SUCCESS = 'CREATE_INTERVALS_SUCCESS'
export type CreateIntervalsSuccessAction = {
  type: typeof CREATE_INTERVALS_SUCCESS
  data: any
}

export const createIntervalsSuccess: ActionCreator<CreateIntervalsSuccessAction> = (data: any) => ({
  type: CREATE_INTERVALS_SUCCESS,
  data
})

// запрос с ошибкой
export const CREATE_INTERVALS_ERROR = 'CREATE_INTERVALS_ERROR'
export type CreateIntervalsErrorAction = {
  type: typeof CREATE_INTERVALS_ERROR
  error: string
}

export const CreateIntervalAsync = (title: any, intervalTimeService: any, intervalTimeMarket: any): ThunkAction<void, RootState, unknown, Action<string>> =>
   async (dispatch, getState) => {
      dispatch(createIntervalsRequest())
    
      try {
        const resp = await api.post(`/users/businessmen/${getState().businessmen.data.id}/schedule/intervals/create`, 
          { 
            title: title,
            businessman: 319, 
            interval_time_service: intervalTimeService ? intervalTimeService : undefined, 
            interval_time_market: intervalTimeMarket ? intervalTimeMarket : undefined,
          }, 
          {headers: {
              'Authorization': `JWT ${getState().token.tokenText}`
            }
          }
        )

        dispatch(allBusinessmenRequestSuccess(resp.data))

        return resp.data
      } catch (error: any) {
        dispatch(allBusinessmenRequestError(error.message))
      }
    }



export const AllBusinessmenUserAsync = (tags: string , coordinates: [[number, number], [number, number]]): ThunkAction<void, RootState, unknown, Action<string>> =>
   async (dispatch, getState) => {
      dispatch(allBusinessmenRequest())
      const str = tags.trim().split(' ').filter(entry => /\S/.test(entry)).join('&')
      try {
        const paramsResp = new URLSearchParams();
        paramsResp.append("tags", str);
        paramsResp.append("left", String(coordinates[0][0]))
        paramsResp.append("left", String(coordinates[0][1]))
        paramsResp.append("right", String(coordinates[1][0]))
        paramsResp.append("right", String(coordinates[1][1]))

        const resp = await api.get(`/users/businessmen/`, {
          params: paramsResp,
          headers: {
          'Authorization': `JWT ${getState().token.tokenText}`
        }
        })

        dispatch(allBusinessmenRequestSuccess(resp.data))

        return resp
      } catch (error: any) {
        dispatch(allBusinessmenRequestError(error.message))
      }
    }
 
