import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { TListServices } from '../../shared/ContainerContent/PageService'
import { RootState } from '../reducer'

import { TDataServices } from './reducer'

// запрос отправлен
export const SERVICES_REQUEST = 'SERVICES_REQUEST'
export type ServicesRequestAction = {
  type: typeof SERVICES_REQUEST
}
export const servicesRequest: ActionCreator<ServicesRequestAction> = () => ({
  type: SERVICES_REQUEST,
})

// запрос успешен
export const SERVICES_REQUEST_SUCCESS = 'SERVICES_SUCCESS'
export type ServicesRequestSuccessAction = {
  type: typeof SERVICES_REQUEST_SUCCESS
  data: TDataServices
}
export const servicesRequestSuccess: ActionCreator<ServicesRequestSuccessAction> = (data) => ({
  type: SERVICES_REQUEST_SUCCESS,
  data,
})

// запрос с ошибкой

export const SERVICES_REQUEST_ERROR = 'SERVICES_REQUEST_ERROR'
export type ServicesRequestErrorAction = {
  type: typeof SERVICES_REQUEST_ERROR
  error: string
}
export const servicesRequestError: ActionCreator<ServicesRequestErrorAction> = (error: string) => ({
  type: SERVICES_REQUEST_ERROR,
  error,
})

export const getService = (): ThunkAction<void, RootState, unknown, Action<string>> => (dispatch, getState) => {
  const listServices: TListServices = {
    idService: '123',
    list: [
      { id: '234567', nameService: 'Маникюр без покрытии', price: 3000, checked: false },
      { id: '234568', nameService: 'Маникюр + гель покрытие +укрепление + выравнивание', price: 4000, checked: false },
      { id: '234569', nameService: 'Педикюр + покрытие', price: 4500, checked: false },
      { id: '234570', nameService: 'Педикюр + покрытие + стопы', price: 5500, checked: false },
      { id: '234580', nameService: 'Наращивание ногтей', price: 6000, checked: false },
    ],
  }
  dispatch(servicesRequestSuccess(listServices))
}
