import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import api from '../../config/api'
import { RootState } from '../reducer'
import { IMe } from './reducer'

// запрос отправлен
export const ACCOUNT_ME_REQUEST = 'ACCOUNT_ME_REQUEST'
export type AccountMeRequestAction = {
  type: typeof ACCOUNT_ME_REQUEST
}

export const accountMeRequest: ActionCreator<AccountMeRequestAction> = () => ({
  type: ACCOUNT_ME_REQUEST,
})

// запрос на изменение отправлен
export const ACCOUNT_ME_CHANGE_REQUEST = 'ACCOUNT_ME_CHANGE_REQUEST'
export type AccountMeChangeRequestAction = {
  type: typeof ACCOUNT_ME_CHANGE_REQUEST
}
export const accountMeChangeRequest: ActionCreator<AccountMeChangeRequestAction> = () => ({
  type: ACCOUNT_ME_CHANGE_REQUEST,
})

// успешно
export const ACCOUNT_ME_REQUEST_SUCCESS = 'ACCOUNT_ME_REQUEST_SUCCESS'
export type AccountMeRequestSuccessAction = {
  type: typeof ACCOUNT_ME_REQUEST_SUCCESS
  data: IMe
}

export const accountMeRequestSuccess: ActionCreator<AccountMeRequestSuccessAction> = (data: IMe) => ({
  type: ACCOUNT_ME_REQUEST_SUCCESS,
  data,
})

// успешно изменено
export const ACCOUNT_ME_CHANGE_SUCCESS = 'ACCOUNT_ME_CHANGE_SUCCESS'
export type AccountMeChangeRequestSuccessAction = {
  type: typeof ACCOUNT_ME_CHANGE_SUCCESS
  data: IMe
}

export const AccountMeChangeRequestSuccess: ActionCreator<AccountMeChangeRequestSuccessAction> = (data: IMe) => ({
  type: ACCOUNT_ME_CHANGE_SUCCESS,
  data,
})

// запрос с ошибкой
export const ACCOUNT_ME_REQUEST_ERROR = 'ACCOUNT_ME_REQUEST_ERROR'
export type AccountMeRequestErrorAction = {
  type: typeof ACCOUNT_ME_REQUEST_ERROR
  error: string
}

export const accountMeRequestError: ActionCreator<AccountMeRequestErrorAction> = (error: string) => ({
  type: ACCOUNT_ME_REQUEST_ERROR,
  error,
})

export const AccountMeGetUserAsync = (token: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch, getState) => { 
    dispatch(accountMeRequest())

    try {
      const resp = await api.get(`/users/me`, {
        headers: {
        'Authorization': `JWT ${getState().session.tokenText || token}`
      }
      })
      dispatch(accountMeRequestSuccess(resp.data))

      return resp
    } catch (error: any) {
      dispatch(accountMeRequestError(error))
    }
  }

export const MeChangeUserAsync = (props: Partial<IMe>): ThunkAction<void, RootState, unknown, Action<string>> =>
async (dispatch, getState) => { 
  dispatch(accountMeRequest())

  try {
    const resp = await api.patch(`/users/me`, props, {
      headers: {
      'Authorization': `JWT ${getState().session.tokenText}`
    }
    })
    dispatch(accountMeRequestSuccess(resp.data))

    return resp
  } catch (error: any) {
    dispatch(accountMeRequestError(error))
  }
}

// // // запрос на удаление отправлен
// export const ACCOUNT_ME_DELETE_REQUEST = 'ACCOUNT_ME_DELETE_REQUEST'
// export type AccountMeDeleteRequestAction = {
//   type: typeof ACCOUNT_ME_DELETE_REQUEST
// }
// export const accountMeDeleteRequest: ActionCreator<AccountMeDeleteRequestAction> = () => ({
//   type:  ACCOUNT_ME_DELETE_REQUEST,
// })

// // успешно
// export const ACCOUNT_ME_DELETE_SUCCESS = 'ACCOUNT_ME_DELETE_SUCCESS'
// export type AccountMeDeleteSuccessAction = {
//   type: typeof ACCOUNT_ME_DELETE_SUCCESS
// }

// export const accountMeDeleteSuccess: ActionCreator<AccountMeDeleteSuccessAction> = () => ({
//   type: ACCOUNT_ME_DELETE_SUCCESS,
// })

// // запрос с ошибкой
// export const ACCOUNT_ME_DELETE_ERROR = 'ACCOUNT_ME_DELETE_ERROR'
// export type AccountMeDeleteErrorAction = {
//   type: typeof ACCOUNT_ME_DELETE_ERROR
//   error: string
// }

// export const accountMeDeleteError: ActionCreator<AccountMeDeleteErrorAction> = (error: string) => ({
//   type: ACCOUNT_ME_DELETE_ERROR,
//   error,
// })

// export const AccountMeDeleteUserAsync = (): ThunkAction<void, RootState, unknown, Action<string>> =>
//   async (dispatch) => { 
//     dispatch(accountMeDeleteRequest())
//     try {
//       const resp = await api.put(`/users/me`, {
//       })
//       dispatch(accountMeDeleteSuccess())
//       return resp
//     } catch (error: any) {
//       dispatch(accountMeDeleteError(error))
//     }
//   }
