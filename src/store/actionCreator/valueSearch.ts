import { ActionCreator } from 'redux'

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
