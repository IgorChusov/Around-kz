import { ActionCreator } from 'redux'
// запрос успешен
export const CARDS_LIST = 'CARDS_LIST'
export type CardsListAction = {
  type: typeof CARDS_LIST
  tokenText: string
}
export const tokenRequestSuccess: ActionCreator<CardsListAction> = (tokenText: string) => ({
  type: CARDS_LIST,
  tokenText,
})
