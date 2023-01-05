import { Reducer } from 'react'

import {
  GetBusinessmenRequestAction, 
  GetBusinessmenRequestErrorAction, 
  GetBusinessmenRequestSuccessAction,
  GET_BUSINESSMEN_ERROR, 
  GET_BUSINESSMEN_REQUEST, 
  GET_BUSINESSMEN_SUCCESS,
  CHANGE_BUSINESSMEN_SUCCESS,
  ChangeBusinessmenSuccessAction,
  CREATE_BUSINESSMEN_REQUEST,
  CREATE_BUSINESSMEN_ERROR,
  CREATE_BUSINESSMEN_SUCCESS,
  CreateBusinessmenRequestAction,
  CreateBusinessmenRequestErrorAction,
  CreateBusinessmenRequestSuccessAction,
  GetAllBusinessmenRequestAction,
  GET_ALL_BUSINESSMEN_REQUEST,
  GET_ALL_BUSINESSMEN_ERROR,
  GET_ALL_BUSINESSMEN_SUCCESS,
  GetAllBusinessmenRequestErrorAction,
  GetAllBusinessmenRequestSuccessAction
} from './action'

type TGetBusinessmenActions = GetBusinessmenRequestAction | 
  GetBusinessmenRequestErrorAction | 
  GetBusinessmenRequestSuccessAction | 
  ChangeBusinessmenSuccessAction | 
  CreateBusinessmenRequestAction | 
  CreateBusinessmenRequestErrorAction | 
  CreateBusinessmenRequestSuccessAction |
  GetAllBusinessmenRequestAction | 
  GetAllBusinessmenRequestErrorAction | 
  GetAllBusinessmenRequestSuccessAction 


export interface IDataMyBusinessmen {
  id: number,
  tags: string [],
  images_service: string[],
  service: {
    id: number
    description: string
    price: string
    title: string
  }[],
  product:{
    id: number
    description: string
    image: string
    min_quantity: number
    price: string
    quantity: number
    title: string
    unit: string
  }[],
  rule_payment: string,
  title: string,
  description: string,
  questionnaire_type: string,
  address: string,
  date_create: Date | null,
  date_update: Date | null,
  icon: null,
  type_booking: string,
  time_bring:null,
  time_end_of_applications: null,
  home_service:boolean,
  user_service:boolean,
  user: number
}

export type TBusinessmenState = {
  myBusinessmen: {
    loading: boolean
    hasLoading: boolean
    error: string
    data: IDataMyBusinessmen
  }
  searchBusinessmen: {
    loading: boolean
    error: string
    data: any
  }
  
}

const initialState = {
  myBusinessmen: {
    loading: false,
    hasLoading: false,
    error: '',
    data: {
      id                      : -1,
      tags                    : [],
      images_service          : [],
      service                 : [],
      product                 : [],
      rule_payment            : '',
      title                   : '',
      description             : '',
      questionnaire_type      : '',
      address                 : '',
      date_create             : null,
      date_update             : null,
      icon                    : null,
      type_booking            : '',
      time_bring              :null,
      time_end_of_applications: null,
      home_service            :false,
      user_service            :false,
      user                    : 0
    }, 
  },
  searchBusinessmen: {
    loading: false,
    error: '',
    data: null
  }
};

export const businessmenReducer: Reducer<TBusinessmenState, TGetBusinessmenActions> = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUSINESSMEN_REQUEST:
      return {
        ...state,
        myBusinessmen: {
          ...state.myBusinessmen,
          loading: true,
        }
      
      }
    case GET_BUSINESSMEN_ERROR:
      return {
        ...state,
        myBusinessmen: {
          ...state.myBusinessmen,
          error: action.error,
          loading: false,
        }
      }
    case GET_BUSINESSMEN_SUCCESS:
    case CHANGE_BUSINESSMEN_SUCCESS:
      return {
        ...state,
        myBusinessmen: {
          ...state.myBusinessmen,
          data: action.data,
          loading: false,
          hasLoading: true,
          error: ''
        }
      }
    case CREATE_BUSINESSMEN_REQUEST:
      return {
        ...state,
        myBusinessmen: {
          ...state.myBusinessmen,
          loading: true,
        }
      }
    case CREATE_BUSINESSMEN_ERROR:
      return {
        ...state,
        myBusinessmen: {
          ...state.myBusinessmen,
          error: action.error,
          loading: false,
        }
      }
    case CREATE_BUSINESSMEN_SUCCESS:
      return {
        ...state,
        myBusinessmen: {
          ...state.myBusinessmen,
          loading: false,
          error: ''
        }
      }
    case GET_ALL_BUSINESSMEN_REQUEST:
      return {
        ...state,
        searchBusinessmen: {
          ...state.searchBusinessmen,
          loading: true,
        }
      }
    case  GET_ALL_BUSINESSMEN_ERROR:
      return {
        ...state,
        searchBusinessmen: {
          ...state.searchBusinessmen,
          error: action.error,
          loading: false,
        }
      }
    case  GET_ALL_BUSINESSMEN_SUCCESS:
      return {
        ...state,
        searchBusinessmen: {
          ...state.searchBusinessmen,
          data: action.data,
          loading: false,
          error: ''
        }
      }
    default:
      return state
  }
}
