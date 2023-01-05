// import { Action, ActionCreator } from "redux"
// import { ThunkAction } from "redux-thunk"
// import api from "../../../config/api"
// import { RootState } from "../../reducer1"

// // запрос на изменение отправлен
// export const ME_PATCH_REQUEST = 'ME_PATCH_REQUEST'
// export type MePatchRequestAction = {
//   type: typeof ME_PATCH_REQUEST
// }
// export const mePatchRequest: ActionCreator<MePatchRequestAction> = () => ({
//   type: ME_PATCH_REQUEST,
// })

// // успешно
// export const ME_PATCH_SUCCESS = 'ME_PATCH_SUCCESS'
// export type MePatchSuccessAction = {
//   type: typeof ME_PATCH_SUCCESS
//   data: string
// }

// export const mePatchSuccess: ActionCreator<MePatchSuccessAction> = (data: any) => ({
//   type: ME_PATCH_SUCCESS,
//   data,
// })

// // запрос с ошибкой
// export const ME_PATCH_ERROR = 'ME_PUT_ERROR'
// export type MePatchErrorAction = {
//   type: typeof ME_PATCH_ERROR
//   error: string
// }

// export const mePatchError: ActionCreator<MePatchErrorAction> = (error: string) => ({
//   type: ME_PATCH_ERROR,
//   error,
// })

// export const MePatchUserAsync = (coordinates: string []): ThunkAction<void, RootState, unknown, Action<string>> =>
//   async (dispatch, getState) => { 
//     dispatch(mePatchRequest())
//     const newData = new FormData()
//     for (let i = 0; i < coordinates.length; i++) {
//       newData.append('coordinates', coordinates[i])
//     }

   
//     try {
//       const resp = await api.patch(`/users/me`, {
//         coordinates: newData
//       }, { 
//         headers: {
//         'Authorization': `JWT ${getState().token.tokenText}`
//       }} )
//       dispatch(mePatchSuccess(resp))
//       return resp
//     } catch (error: any) {
//         dispatch(mePatchError(error))
//     }
//   }
