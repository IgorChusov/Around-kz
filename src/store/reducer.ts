import { Reducer } from 'redux'

import { ITEM } from './actionCreator/item'
import { PRODUCT_LIST_SHOPPING, TProductListShopping } from './actionCreator/productShopingList'
import { SERVICES_LIST_SHOPPING, TServicesListShopping } from './actionCreator/servicesShoppingList'
import { CREATE_BUSINESSMEN_ERROR, CREATE_BUSINESSMEN_REQUEST, CREATE_BUSINESSMEN_SUCCESS } from './businessman/create/action'
import { createBusinessmenReducer, CreateBusinessmenState } from './businessman/create/reduser'
import { GET_BUSINESSMEN_ERROR, GET_BUSINESSMEN_REQUEST, GET_BUSINESSMEN_SUCCESS } from './businessman/get/action'
import { getBusinessmenReducer, IDataBusinessmen, TGetBusinessmenState } from './businessman/get/reduser'
import { ME_REQUEST, ME_REQUEST_ERROR, ME_REQUEST_SUCCESS } from './me/get/action'
import { meGetReducer, MeGetState } from './me/get/reduser'
import { SHOPPING_CARD_LIST } from './payList/action'
import { PRODUCT_REQUEST, PRODUCT_REQUEST_ERROR, PRODUCT_REQUEST_SUCCESS } from './products/action'
import { productsReducer, ProductsState } from './products/reduces'
import { SERVICES_REQUEST, SERVICES_REQUEST_ERROR, SERVICES_REQUEST_SUCCESS } from './services/action'
import { servicesReducer, ServicesState } from './services/reducer'
import {
  REGISTER_REQUEST,
  SMS_REQUEST_SUCCESS,
  TOKEN_REQUEST_SUCCESS,
  TOKEN_REQUEST_ERROR
} from './token/action'
import { tokenReducer, TokenState } from './token/reduser'

export type RootState = {
  token: TokenState
  me: MeGetState
  businessman: CreateBusinessmenState
  businessmen: TGetBusinessmenState 
  dateReserve: string
  cardsPay: IListCard
  shoppingCart: []
  servicesData: ServicesState
  productsData: ProductsState
  servicesListShopping: TServicesListShopping
  productListShopping: TProductListShopping
  item: string
 
}

export type IListCard = {
  number: string
  date: string
  code: string
  name: string
}[]

const initialState: RootState = {
  token: {
    loading: false,
    error: '',
    tokenText: '',
  },
  me: {
    loading: false,
    error: '',
    data: {
      id: -1,
      username: '',
      phone: '',
      businessman: [],
      address: null,
      avatar:  null,
      status: '',
      bank_card: null,
    },
  },
  businessman: {
    loading: false,
    error: '',
    data: null,
  },
  businessmen: {
    loading: false,
    hasLoading: false,
    error: '',
    data: null,
  },

  item: '',
  dateReserve: '21.01',
  cardsPay: [],
  shoppingCart: [],
  // корзина услуги
  servicesListShopping: {
    id: '',
    date: '',
    time: '',
    fullPrice: 0,
  },
  productListShopping: {
    id: '',
    fullPrice: 0,
    name: '',
  },
  servicesData: {
    loading: false,
    error: '',
    data: { idService: '', list: [{ id: '', nameService: '', price: 0, checked: false }] },
  },
  productsData: {
    loading: false,
    error: '',
    data: {
      name: '',
      idStore: '',
      typeStore: '',
      description: '',
      list: [{ id: '', nameProduct: '', price: 0, min: 0, description: '', img: '', amountProduct: 0, unit: '' }],
    },
  },
}

export const rootReducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM:
      return {
        ...state,
        item: action.item,
      }
    case ME_REQUEST:
    case ME_REQUEST_SUCCESS:
    case ME_REQUEST_ERROR:
      return {
        ...state,
        me: meGetReducer(state.me, action),
      }
    case REGISTER_REQUEST:
    case SMS_REQUEST_SUCCESS:
    case TOKEN_REQUEST_SUCCESS:
    case TOKEN_REQUEST_ERROR:
      return {
        ...state,
        token: tokenReducer(state.token, action),
      }
    case CREATE_BUSINESSMEN_REQUEST:
    case CREATE_BUSINESSMEN_SUCCESS:
    case CREATE_BUSINESSMEN_ERROR:
      return {
        ...state,
        businessman: createBusinessmenReducer(state.businessman, action),
      }
    case GET_BUSINESSMEN_REQUEST:
    case GET_BUSINESSMEN_SUCCESS:
    case GET_BUSINESSMEN_ERROR:
      return {
        ...state,
        businessmen: getBusinessmenReducer(state.businessmen, action),
      }
    case SERVICES_REQUEST:
    case SERVICES_REQUEST_SUCCESS:
    case SERVICES_REQUEST_ERROR:
      return {
        ...state,
        servicesData: servicesReducer(state.servicesData, action),
      }
    case PRODUCT_REQUEST:
    case PRODUCT_REQUEST_SUCCESS:
    case PRODUCT_REQUEST_ERROR:
      return {
        ...state,
        productsData: productsReducer(state.productsData, action),
      }
    case 'CARDS_LIST':
      return {
        ...state,
        cardsPay: action.list,
      }
    case 'DATE_CHOICE_RESERVE':
      return {
        ...state,
        dateReserve: action.date,
      }
    case SHOPPING_CARD_LIST:
      return {
        ...state,
        shoppingCart: action.data,
      }
    case SERVICES_LIST_SHOPPING:
      return {
        ...state,
        servicesListShopping: action.data,
      }
    case PRODUCT_LIST_SHOPPING:
      return {
        ...state,
        productListShopping: action.data,
      }
    default:
      return state
  }
}
