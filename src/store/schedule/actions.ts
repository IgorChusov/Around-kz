import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import api from '../../config/api'
import { RootState } from '../reducer'

// запрос отправлен
export const SCHEDULE_REQUEST = 'SCHEDULE_REQUEST'
export type ScheduleRequestAction = {
  type: typeof SCHEDULE_REQUEST
}

export const scheduleRequest: ActionCreator<ScheduleRequestAction> = () => ({
  type: SCHEDULE_REQUEST,
})

// успешно
export const SCHEDULE_REQUEST_SUCCESS = 'SCHEDULE_REQUEST_SUCCESS'
export type ScheduleRequestSuccessAction = {
  type: typeof SCHEDULE_REQUEST_SUCCESS
  data: any
}

export const scheduleRequestSuccess: ActionCreator< ScheduleRequestSuccessAction> = (data: any) => ({
  type: SCHEDULE_REQUEST_SUCCESS,
  data,
})

// запрос с ошибкой
export const SCHEDULE_REQUEST_ERROR = 'SCHEDULE_REQUEST_ERROR'
export type ScheduleRequestErrorAction = {
  type: typeof SCHEDULE_REQUEST_ERROR
  error: string
}

export const scheduleRequestError: ActionCreator<ScheduleRequestErrorAction> = (error: string) => ({
  type: SCHEDULE_REQUEST_ERROR,
  error,
})

export const ScheduleGetIntervalsAsync = (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => { 
    dispatch(scheduleRequest())

    try {
      const resp = await api.get(`/users/businessmen/${getState().businessmen.data.id}/schedule/intervals`, {
        headers: {
        'Authorization': `JWT ${getState().token.tokenText}`
      }
      })
      dispatch(scheduleRequestSuccess(resp.data))

      return resp
    } catch (error: any) {
      dispatch(scheduleRequestError(error))
    }
  }
