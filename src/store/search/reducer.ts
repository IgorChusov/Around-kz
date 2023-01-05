import { Reducer } from 'react'

import { ValueAreaAction, ValueSearchAction, VALUE_AREA, VALUE_SEARCH } from './action'

type RegisterActions = ValueSearchAction | ValueAreaAction;

export type TValueArea =  [[ number,  number], [number, number]]

export type TSearchState = {
  dataSearch: {
    valueSearch: string,
    view: boolean
  },
  valueArea: TValueArea | null
}

const initialState = {
  dataSearch: {
    valueSearch: '',
    view: false
  },
  valueArea: null,
}

export const searchReducer: Reducer<TSearchState, RegisterActions> = (state = initialState, action) => {
  switch (action.type) {
    case VALUE_SEARCH:
      return {
        ...state,
        dataSearch: action.dataSearch
      }
      case VALUE_AREA:
        return {
          ...state, 
          valueArea: action.valueArea
      }

    default:
      return state
  }
}
