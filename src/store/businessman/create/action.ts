import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import api from '../../../config/api'
import { RootState } from '../../reducer'


// запрос отправлен
export const CREATE_BUSINESSMEN_REQUEST = 'CREATE_BUSINESSMEN_REQUEST'
export type CreateBusinessmenRequestAction = {
  type: typeof CREATE_BUSINESSMEN_REQUEST
}
export const createBusinessmenRequest: ActionCreator<CreateBusinessmenRequestAction> = () => ({
  type: CREATE_BUSINESSMEN_REQUEST,
})

// запрос смс успешен
export const CREATE_BUSINESSMEN_SUCCESS = 'CREATE_BUSINESSMEN_SUCCESS'
export type CreateBusinessmenRequestSuccessAction = {
  type: typeof CREATE_BUSINESSMEN_SUCCESS
  data: any
}

export const createBusinessmenSuccess: ActionCreator<CreateBusinessmenRequestSuccessAction> = (data: any) => ({
  type: CREATE_BUSINESSMEN_SUCCESS,
  data
})


// запрос с ошибкой
export const CREATE_BUSINESSMEN_ERROR = 'CREATE_BUSINESSMEN_ERROR'
export type CreateBusinessmenRequestErrorAction = {
  type: typeof CREATE_BUSINESSMEN_ERROR
  error: string
}

export const createBusinessmenError: ActionCreator<CreateBusinessmenRequestErrorAction> = (error: string) => ({
  type: CREATE_BUSINESSMEN_ERROR,
  error,
})

export const CreateBusinessmenUserAsync = (): ThunkAction<void, RootState, unknown, Action<string>> =>
   async (dispatch) => {
      dispatch(createBusinessmenRequest())

      try {
        const resp = await api.post(`/users/businessmen/`)

        dispatch(createBusinessmenSuccess(resp))

        return resp
      } catch (error: any) {
        dispatch(createBusinessmenError(error.message))
      }
    }
