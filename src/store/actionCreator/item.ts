import { ActionCreator } from 'redux'
// запрос успешен
export const ITEM = 'ITEM'
export type ItemAction = {
  type: typeof ITEM
  item: string
}
export const itemRequestSuccess: ActionCreator<ItemAction> = (item) => ({
  type: ITEM,
  item,
})
