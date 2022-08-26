import { Reducer } from 'redux'
import { TValueArea, VALUE_AREA } from './actionCreator/valueArea'
import { PRODUCT_LIST_SHOPPING, TProductListShopping } from './actionCreator/productShopingList'
import { SERVICES_LIST_SHOPPING, TServicesListShopping } from './actionCreator/servicesShoppingList'
import { TValueSearch, VALUE_SEARCH } from './actionCreator/valueSearch'
import { CREATE_ADS_ERROR, CREATE_ADS_REQUEST, CREATE_ADS_SUCCESS } from './ads/action'
import { createAdsReducer, CreateAdsState } from './ads/reduser'
import { AllBusinessmenState } from './businessman/all/reduser'
import { CREATE_BUSINESSMEN_ERROR, CREATE_BUSINESSMEN_REQUEST, CREATE_BUSINESSMEN_SUCCESS } from './businessman/create/action'
import { createBusinessmenReducer, CreateBusinessmenState } from './businessman/create/reduser'
import { CHANGE_BUSINESSMEN_SUCCESS, GET_BUSINESSMEN_ERROR, GET_BUSINESSMEN_REQUEST, GET_BUSINESSMEN_SUCCESS } from './businessman/get/action'
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
  listBusinessmen: AllBusinessmenState
  ads: CreateAdsState
  dataSearch: TValueSearch
  valueArea: TValueArea | null

  dateReserve: string
  cardsPay: IListCard
  shoppingCart: []
  productsData: ProductsState
  servicesListShopping: TServicesListShopping
  productListShopping: TProductListShopping
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
    data: {
      id: 0,
      tags: [],
      images_service: [],
      service:[],
      product:[],
      rule_payment: '',
      title: '',
      description: '',
      questionnaire_type: '',
      address: '',
      date_create: null,
      date_update: null,
      icon: null,
      type_booking: '',
      time_bring:null,
      time_end_of_applications: null,
      home_service:false,
      user_service:false,
      user: 0
    },
  },
  listBusinessmen: {
    loading: false,
    error: '',
    data: null,
  },
  ads: {
    loading: false,
    error: '',
    data: null,
  },
  dataSearch: {
    valueSearch: '',
    view: false
  },
  
  valueArea: null,

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
    case CHANGE_BUSINESSMEN_SUCCESS:
      return {
        ...state,
        businessmen: getBusinessmenReducer(state.businessmen, action),
      }
    case CREATE_ADS_REQUEST:
    case CREATE_ADS_SUCCESS:
    case CREATE_ADS_ERROR:
      return {
        ...state,
        ads: createAdsReducer(state.ads, action),
      }
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
