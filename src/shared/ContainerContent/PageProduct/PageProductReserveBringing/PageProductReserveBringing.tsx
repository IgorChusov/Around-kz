import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import { TProductListShopping } from '../../../../store/actionCreator/productShopingList'
import { servicesListShopping } from '../../../../store/actionCreator/servicesShoppingList'

import { RootState } from '../../../../store/reducer'
import { ButtonBack } from '../../../universalComponent/ButtonBack'
import { ButtonCarousel } from '../../../universalComponent/ButtonCarousel'
import { EColor, Text } from '../../../universalComponent/Text'

import styles from './pageproductreserve.css'
import { PageProductSwiperDate } from './PageProductSwiperDate'

const listFull = [
  {
    date: '03.03',
    choiceTime: [
      { time: '11:00', freedom: true },
      { time: '12:00', freedom: false },
      { time: '13:00', freedom: true },
      { time: '14:00', freedom: true },
      { time: '15:00', freedom: true },
      { time: '16:00', freedom: true },
      { time: '17:00', freedom: false },
    ],
  },
  {
    date: '04.03',
    choiceTime: [
      { time: '11:00', freedom: true },
      { time: '12:00', freedom: false },
      { time: '13:00', freedom: true },
      { time: '14:00', freedom: false },
      { time: '15:00', freedom: true },
      { time: '16:00', freedom: true },
      { time: '17:00', freedom: false },
    ],
  },
  {
    date: '05.03',
    choiceTime: [
      { time: '11:00', freedom: false },
      { time: '12:00', freedom: false },
      { time: '13:00', freedom: true },
      { time: '14:00', freedom: true },
      { time: '15:00', freedom: true },
      { time: '16:00', freedom: true },
      { time: '17:00', freedom: false },
    ],
  },
  {
    date: '06.03',
    choiceTime: [
      { time: '11:00', freedom: true },
      { time: '12:00', freedom: false },
      { time: '13:00', freedom: false },
      { time: '14:00', freedom: true },
      { time: '15:00', freedom: true },
      { time: '16:00', freedom: true },
      { time: '17:00', freedom: false },
    ],
  },
  {
    date: '07.03',
    choiceTime: [
      { time: '11:00', freedom: true },
      { time: '12:00', freedom: false },
      { time: '13:00', freedom: true },
      { time: '14:00', freedom: true },
      { time: '15:00', freedom: false },
      { time: '16:00', freedom: true },
      { time: '17:00', freedom: false },
    ],
  },
  {
    date: '08.03',
    choiceTime: [
      { time: '11:00', freedom: true },
      { time: '12:00', freedom: false },
      { time: '13:00', freedom: true },
      { time: '14:00', freedom: true },
      { time: '15:00', freedom: true },
      { time: '16:00', freedom: true },
      { time: '17:00', freedom: false },
    ],
  },
  {
    date: '09.03',
    choiceTime: [
      { time: '11:00', freedom: true },
      { time: '12:00', freedom: false },
      { time: '13:00', freedom: true },
      { time: '14:00', freedom: true },
      { time: '15:00', freedom: true },
      { time: '16:00', freedom: false },
      { time: '17:00', freedom: false },
    ],
  },
]
interface IElement {
  id: string
  nameProduct: string
  price: number
  min: number
  description: string
  img: string
  unit: string
}
interface IPageProductReserve {}
export function PageProductReserveBringing (props: IPageProductReserve) {
  // const dispatch = useDispatch()
  // const listShopping = useSelector<RootState, TProductListShopping>((state) => state.productListShopping)
  // const [list, setList] = useState(listFull)
  // const { id, idProduct } = useParams<{ id?: string; idProduct?: string }>()
  // const data = useSelector<RootState, TDataProducts>((state) => state.productsData.data)
  // const [fullPrice, setFullPrice] = useState(0)
  // const [fullAmount, setFullAmount] = useState(0)
  // const [fullList, setFullList] = useState(listShopping.list)
  // useEffect(() => {
  //   const price = listShopping.list?.reduce((sum, order) => sum + order.price * Number(order.amount), 0)
  //   const amount = listShopping.list?.reduce((sum, order) => sum + Number(order.amount), 0)
  //   setFullPrice(price || 0)
  //   setFullAmount(amount || 0)
  // }, [listShopping, fullList])

  // const clickPlus = (index: number) => {
  //   if (!fullList) return
  //   const newList = fullList.slice()
  //   newList[index].amount = String(Number(newList[index].amount) + 1)
  //   dispatch(servicesListShopping({ id: id, fullPrice: fullPrice, name: data.name, list: newList }))
  //   setFullList(newList)
  // }
  // const clickMinus = (index: number) => {
  //   if (!fullList) return
  //   const newList = fullList.slice()
  //   newList[index].amount = String(Number(newList[index].amount) - 1)
  //   dispatch(servicesListShopping({ id: id, fullPrice: fullPrice, name: data.name, list: newList }))
  //   setFullList(newList)
  // }

  return (
    <div className={styles.container}>
      {/* <ButtonBack addressLink={`/pageProducts/bringing/${id}/buyCart`} className={styles.buttonBack} />
      <Text className={styles.title} size={24} As="h2" color={EColor.greenDark}>
        {data.name}
      </Text>
      <Text className={styles.subtitle} size={24} As="h3" color={EColor.greenDark}>
        Дата привоза
      </Text>
      <PageProductSwiperDate list={list} />
      <div className={styles.containerInfo}>
        <div className={styles.markerInfo}>
          <div className={styles.marker}></div>
          <Text size={12} color={EColor.greenDark}>
            Занято
          </Text>
        </div>
        <div className={styles.containerPagination}>
          <div style={{ height: `${20 + fullAmount * 10}%` }} className={styles.containerChange}></div>
          <div style={{ height: `${20}%` }} className={styles.containerAmount}></div>
        </div>
      </div>
      <Text className={styles.timer} size={16} As="p" color={EColor.greenDark}>
        {'До окончания бронирования:'}
        <Text color={EColor.greenDark} size={16}>{`${'2 д 17 ч'}`}</Text>
      </Text>
      <ul className={styles.listChoice}>
        {listShopping.list?.map((elem, index) => {
          return (
            <li key={elem.id} className={styles.itemChoice}>
              <Text
                className={`${styles.text} ${styles.textAmount}`}
                color={EColor.greenDark}
                mobileSize={14}
                size={16}
                As="p"
              >
                <Text className={`${styles.text} ${styles.textName}`} color={EColor.greenDark} size={16} As="span">{`${
                  index + 1
                }.`}</Text>
                {`${elem.nameProduct}`}
              </Text>
              <ButtonCarousel
                onPlus={() => {
                  clickPlus(index)
                }}
                onMinus={() => {
                  clickMinus(index)
                }}
                amount={Number(elem.amount)}
              />
              <Text
                className={`${styles.text} ${styles.textPrice}`}
                color={EColor.greenDark}
                mobileSize={14}
                size={16}
                As="p"
              >{`${elem.price} тнг/кг`}</Text>
            </li>
          )
        })}
      </ul>
      <Text
        className={`${styles.text} ${styles.textFinal}`}
        color={EColor.greenDark}
        size={16}
        As="p"
      >{`Итого: ${fullPrice} тнг`}</Text>
      <Link to={`/pageProducts/bringing/${id}/payment`} className={styles.button}>
        <Text color={EColor.white} size={20}>
          Забронировать
        </Text>
      </Link> */}
    </div>
  )
}
