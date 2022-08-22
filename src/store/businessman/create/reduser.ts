import { Reducer } from 'react'
import { IDataBusinessmen } from '../get/reduser';

import {
  CreateBusinessmenRequestAction, 
  CreateBusinessmenRequestErrorAction, 
  CreateBusinessmenRequestSuccessAction,
  CREATE_BUSINESSMEN_ERROR, 
  CREATE_BUSINESSMEN_REQUEST, 
  CREATE_BUSINESSMEN_SUCCESS 
} from './action'

type CreateBusinessmenActions = 
  CreateBusinessmenRequestAction 
  | CreateBusinessmenRequestErrorAction 
  | CreateBusinessmenRequestSuccessAction 
;

export type CreateBusinessmenState = {
  loading: boolean
  error: string
  data: IDataBusinessmen | null
}

export const createBusinessmenReducer: Reducer<CreateBusinessmenState, CreateBusinessmenActions> = (state, action) => {
  switch (action.type) {
    case CREATE_BUSINESSMEN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CREATE_BUSINESSMEN_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    case CREATE_BUSINESSMEN_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        error: ''
      }
    default:
      return state
  }
}
