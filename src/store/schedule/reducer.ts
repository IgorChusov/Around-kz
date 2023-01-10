import { Reducer } from 'react'
import { ScheduleIntervalsErrorAction, ScheduleIntervalsRequestAction, ScheduleIntervalsSuccessAction, SCHEDULE_INTERVALS_ERROR, SCHEDULE_INTERVALS_REQUEST, SCHEDULE_INTERVALS_SUCCESS} from './actions';

type TScheduleActions = ScheduleIntervalsRequestAction |
  ScheduleIntervalsSuccessAction |
  ScheduleIntervalsErrorAction;

export type TScheduleState = {
  intervals: {
    loading: boolean,
    error: string,
    data: {
      id:	number,
      title: string,
      businessman:	number,
      interval_time_service: {time: string}[]
    }
  }
}

const initialState = {
  intervals: {
    loading: false,
    error: '',
    data: {
      id:	-1,
      title: '',
      businessman:	-1,
      interval_time_service: []
    }
  }
};

export const scheduleReducer: Reducer<TScheduleState, TScheduleActions> = (state = initialState, action) => {
  switch (action.type) {
      case SCHEDULE_INTERVALS_REQUEST:
        return {
          ...state,
          intervals: {
            ...state.intervals,
            loading: true,
          }
        }
      case SCHEDULE_INTERVALS_SUCCESS:
        return {
          ...state,
          intervals: {
            ...state.intervals,
            loading: false,
            error: '',
            data: action.data
          }
        }
      case SCHEDULE_INTERVALS_ERROR:
        return {
          ...state,
          intervals: {
            ...state.intervals,
            loading: false,
            error: '',
          }
        }
      default:
        return state
  }
}
