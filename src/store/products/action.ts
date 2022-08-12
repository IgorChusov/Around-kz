import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { RootState } from '../reducer'

import img1 from '../../assets/images/product1.jpg'
import img2 from '../../assets/images/product2.jpg'
import img3 from '../../assets/images/product3.jpg'
import img4 from '../../assets/images/product4.jpg'
import img5 from '../../assets/images/product5.jpg'
import img6 from '../../assets/images/product6.jpg'
import img7 from '../../assets/images/product7.jpg'

import s1 from '../../assets/images/s1.jpg'
import s2 from '../../assets/images/s2.jpg'
import s3 from '../../assets/images/s3.jpg'
import s4 from '../../assets/images/s4.jpg'
import s5 from '../../assets/images/s5.jpg'

import { TDataProducts } from './reduces'
const list = [
  {
    nameProduct: 'Грецкий орех',
    min: 1,
    price: 1400,
    id: '1234',
    description: 'Вкусные орехи, недорого, качественные',
    img: img1,
    amountProduct: 5,
    unit: 'кг',
  },
  {
    nameProduct: 'Домашнее масло',
    min: 0.5,
    price: 3800,
    id: '1235',
    description: 'Масло натуральное',
    img: img2,
    amountProduct: 5,
    unit: 'кг',
  },
  {
    nameProduct: 'Домашняя сметана',
    min: 0.5,
    price: 1250,
    id: '1236',
    description: 'Сметана жирностью 25%',
    img: img3,
    amountProduct: 5,
    unit: 'кг',
  },
  {
    nameProduct: 'Кымыз свежий',
    min: 1,
    price: 1300,
    id: '1237',
    description: 'Свежий, вкусный',
    img: img4,
    amountProduct: 5,
    unit: 'кг',
  },
  {
    nameProduct: 'Мед (Бал), горный',
    min: 1,
    price: 2500,
    id: '1238',
    description: 'Собранный специально для вас',
    img: img5,
    amountProduct: 5,
    unit: 'кг',
  },
  {
    nameProduct: 'Творог домашний',
    min: 1,
    price: 1200,
    id: '1239',
    description: 'Творог домашний, качественный, только из свежего молока',
    img: img6,
    amountProduct: 5,
    unit: 'кг',
  },
  {
    nameProduct: 'Шортанды, масло сливочное',
    min: 1,
    price: 3000,
    id: '1241',
    description: 'Масло из свежего молока',
    img: img7,
    amountProduct: 5,
    unit: 'шт',
  },
]

const listStore = [
  {
    nameProduct: 'Комод. 80*50 см.',
    min: 1,
    price: 60000,
    id: '1234',
    description: 'Покупали за 210 000 тг. БУ. Идеальное состояние',
    img: s1,
    amountProduct: 1,
    unit: 'шт',
  },
  {
    nameProduct: 'Детская двуспальная кровать',
    min: 1,
    price: 30000,
    id: '1235',
    description: 'БУ. Идеальное состояние',
    img: s2,
    amountProduct: 1,
    unit: 'шт',
  },
  {
    nameProduct: 'Детский компьютерный стол',
    min: 1,
    price: 30000,
    id: '1236',
    description: 'Натуральное дерево. БУ, идеальное состояние',
    img: s3,
    amountProduct: 1,
    unit: 'шт',
  },
  {
    nameProduct: 'Двухспальная кровать, 180*200',
    min: 1,
    price: 80000,
    id: '1238',
    description: 'БУ, 2 года в эксплуатации',
    img: s4,
    amountProduct: 1,
    unit: 'шт',
  },
  {
    nameProduct: 'Люстра',
    min: 1,
    price: 40000,
    id: '1241',
    description: 'Идеальное состояние. Мягкий, при этом яркий свет',
    img: s5,
    amountProduct: 1,
    unit: 'шт',
  },
]

// запрос отправлен
export const PRODUCT_REQUEST = 'PRODUCT_REQUEST'
export type ProductRequestAction = {
  type: typeof PRODUCT_REQUEST
}
export const productRequest: ActionCreator<ProductRequestAction> = () => ({
  type: PRODUCT_REQUEST,
})

// запрос успешен
export const PRODUCT_REQUEST_SUCCESS = 'PRODUCT_REQUEST_SUCCESS'
export type ProductRequestSuccessAction = {
  type: typeof PRODUCT_REQUEST_SUCCESS
  data: TDataProducts
}
export const productRequestSuccess: ActionCreator<ProductRequestSuccessAction> = (data) => ({
  type: PRODUCT_REQUEST_SUCCESS,
  data,
})

// запрос с ошибкой

export const PRODUCT_REQUEST_ERROR = 'PRODUCT_REQUEST_ERROR'
export type ProductRequestErrorAction = {
  type: typeof PRODUCT_REQUEST_ERROR
  error: string
}
export const productRequestError: ActionCreator<ProductRequestErrorAction> = (error: string) => ({
  type: PRODUCT_REQUEST_ERROR,
  error,
})

export const getProducts =
  (id: string, type: string): ThunkAction<void, RootState, unknown, Action<string>> =>
    (dispatch, getState) => {
      if (type === 'bringing') {
        dispatch(
          productRequestSuccess({
            name: 'Домашние продукты',
            idStore: id,
            typeStore: type,
            description: 'Продукты возим из Шортанды. Работаем уже 5 лет. Всегда свежее и вкусное.',
            list: list,
          }),
        )
      }
      if (type === 'store') {
        dispatch(
          productRequestSuccess({
            name: 'Мебель',
            idStore: id,
            typeStore: type,
            description: 'Продаю дорогую мебель в связи с переездом. Производство Италия',
            list: listStore,
          }),
        )
      }
    }
