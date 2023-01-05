import { ActionCreator } from 'redux'
import { TValueArea } from './reducer'


export const VALUE_AREA = 'VALUE_AREA'
export type ValueAreaAction = {
  type: typeof VALUE_AREA
  valueArea: TValueArea | null
}

export const changeValueArea: ActionCreator<ValueAreaAction> = (valueArea: TValueArea) => ({
  type: VALUE_AREA,
  valueArea,
})

export type TValueSearch = {
  valueSearch: string
  view: boolean
}

export const VALUE_SEARCH = 'VALUE_SEARCH'
export type ValueSearchAction = {
  type: typeof VALUE_SEARCH
  dataSearch: TValueSearch
}
export const valueSearch: ActionCreator<ValueSearchAction> = (dataSearch: TValueSearch) => ({
  type: VALUE_SEARCH,
  dataSearch,
})
