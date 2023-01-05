// import { Reducer } from 'react'

// import { MePatchErrorAction, MePatchRequestAction, MePatchSuccessAction, ME_PATCH_ERROR, ME_PATCH_REQUEST, ME_PATCH_SUCCESS } from './action'

// type MeActions = 
//    MePatchRequestAction
//   | MePatchSuccessAction
//   | MePatchErrorAction
// ;

// export type MePatchState = {
//   loading: boolean
//   error: string
//   data: any
// }

// export const mePatchReducer: Reducer<MePatchState, MeActions> = (state, action) => {
//   switch (action.type) {
//     case ME_PATCH_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       }
//     case ME_PATCH_ERROR:
//       return {
//         ...state,
//         error: action.error,
//         loading: false,
//       }
//     case ME_PATCH_SUCCESS:
//       return {
//         ...state,
//         data: action.data,
//         loading: false,
//         error: ''
//       }
//     default:
//       return state
//   }
// }
