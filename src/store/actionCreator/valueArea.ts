import { ActionCreator } from 'redux'

export type TValueArea =  [[ number,  number], [number, number]]


export const VALUE_AREA = 'VALUE_AREA'
export type ValueAreaAction = {
  type: typeof VALUE_AREA
  valueArea: TValueArea | null
}
export const changeValueArea: ActionCreator<ValueAreaAction> = (valueArea: TValueArea) => ({
  type: VALUE_AREA,
  valueArea,
})
