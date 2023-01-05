// import { Reducer } from 'react'

// import { MeDeleteErrorAction, MeDeleteRequestAction, MeDeleteSuccessAction, ME_DELETE_ERROR, ME_DELETE_REQUEST, ME_DELETE_SUCCESS } from './action'

// type MeActions = 
//   | MeDeleteRequestAction
//   | MeDeleteSuccessAction
//   | MeDeleteErrorAction
// ;

// export type MeDeleteState = {
//   loading: boolean
//   error: string
// }

// export const meDeleteReducer: Reducer<MeDeleteState, MeActions> = (state, action) => {
//   switch (action.type) {
//     case ME_DELETE_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       }
//     case ME_DELETE_ERROR:
//       return {
//         ...state,
//         error: action.error,
//         loading: false,
//       }
//     case ME_DELETE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: ''
//       }
//     default:
//       return state
//   }
// }
