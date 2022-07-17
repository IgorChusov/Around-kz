import { ActionCreator } from 'redux'

export const SHOPPING_CARD_LIST = 'SHOPPING_CARD_LIST'
export type ShoppingCArdListAction = {
  type: typeof SHOPPING_CARD_LIST
}
export const charactersRequest: ActionCreator<ShoppingCArdListAction> = (data) => ({
  type: SHOPPING_CARD_LIST,
  data,
})
