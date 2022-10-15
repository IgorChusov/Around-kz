import React from 'react'

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import img from '../../../assets/images/iconFeedback.png'
import { EColor, Text } from '../../components/Text'
import { productListShopping } from '../../../store/actionCreator/productShopingList'

import styles from './paymentsuccess.css'
export function PaymentSuccess () {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(
      productListShopping({
        id: '',
        fullPrice: 0,
        name: '',
      }),
    )
  }
  return (
    <div className={styles.container}>
      <Text className={styles.title} color={EColor.greenDark} size={24} As="h2">
        Оплата прошла успешно!
      </Text>
      <img className={styles.img} src={img} alt="Успешно" />
      <Text className={styles.text} color={EColor.greenDark} size={16} As="p">
        Благодарим за использование нашего сервиса.Вы можете посмотреть информацию о записи в вашем профиле
      </Text>
      <Link to={'/menu/account/personal'} onClick={handleClick} className={styles.button}>
        Перейти к записям
      </Link>
    </div>
  )
}
