import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import api from '../../config/api'
import { RootState } from '../reducer'

// запрос отправлен
export const SCHEDULE_INTERVALS_REQUEST = 'SCHEDULE_INTERVALS_REQUEST'
export type ScheduleIntervalsRequestAction = {
  type: typeof SCHEDULE_INTERVALS_REQUEST
}

export const scheduleIntervalsRequest: ActionCreator<ScheduleIntervalsRequestAction> = () => ({
  type: SCHEDULE_INTERVALS_REQUEST,
})

// успешно
export const SCHEDULE_INTERVALS_SUCCESS = 'SCHEDULE_INTERVALS_SUCCESS'
export type ScheduleIntervalsSuccessAction = {
  type: typeof SCHEDULE_INTERVALS_SUCCESS
  data: any
}

export const scheduleIntervalsSuccess: ActionCreator<ScheduleIntervalsSuccessAction> = (data: any) => ({
  type: SCHEDULE_INTERVALS_SUCCESS,
  data,
})

// запрос с ошибкой
export const SCHEDULE_INTERVALS_ERROR = 'SCHEDULE_INTERVALS_ERROR'
export type ScheduleIntervalsErrorAction = {
  type: typeof SCHEDULE_INTERVALS_ERROR
  error: string
}

export const scheduleIntervalsError: ActionCreator<ScheduleIntervalsErrorAction> = (error: string) => ({
  type: SCHEDULE_INTERVALS_ERROR,
  error,
})

export const getScheduleIntervalsAsync = (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => { 
    dispatch(scheduleIntervalsRequest())

    try {
      const resp = await api.get(`/users/businessmen/${getState().businessmen.myBusinessmen.data.id}/schedule/intervals`, {
        headers: {
        'Authorization': `JWT ${getState().session.tokenText}`
      }
      })
      dispatch(scheduleIntervalsSuccess(resp.data))

      return resp
    } catch (error: any) {
      dispatch(scheduleIntervalsError(error))
    }
  }
