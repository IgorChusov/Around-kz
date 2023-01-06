import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams, useRouteMatch } from 'react-router-dom'

import { TProductListShopping } from '../../../../store/actionCreator/productShopingList'
import { RootState } from '../../../../store/reducer'
import { IconCancel } from '../../../Icons/IconCancel'
import { ButtonBack } from '../../../components/Buttons/ButtonBack'
import { Text, EColor } from '../../../components/Text'

import styles from './pageproductlistshopping.css'

interface IPageProductReserve {
  clickButtonBack: () => void
}

export function PageProductListShopping (props: IPageProductReserve) {
  // const listShopping = useSelector<RootState, TProductListShopping>((state) => state.productListShopping)
  const [fullPrice, setFullPrice] = useState(0)
  const [fullAmount, setFullAmount] = useState(0)
  const { id, type, idProduct } = useParams<{ id?: string; type?: string; idProduct?: string }>()
  const { path, url } = useRouteMatch()
  // useEffect(() => {
  //   if (!listShopping) return
  //   const full = listShopping.list?.reduce((sum, order) => sum + order.price * Number(order.amount), 0)
  //   if (!full) return
  //   setFullPrice(full)
  // }, [listShopping])

  return (
    <div className={styles.container}>
      <ButtonBack addressLink={`/pageProducts/${type}/${id}`} className={styles.buttonBack} />
      <Text className={styles.title} size={24} As="h2" color={EColor.greenDark}>
        {/* {listShopping.name} */}
      </Text>
      <Text className={styles.subtitle} size={24} As="h3" color={EColor.greenDark}>
        Ваш заказ
      </Text>
      <ul className={styles.list}>
        {/* {listShopping.list?.map((elem, index) => {
          return (
            <li key={elem.id} className={styles.item}>
              <div className={styles.buttonContainer}>
                <button onClick={() => {}} className={styles.itemButton}>
                  <IconCancel />
                </button>
                <Text className={styles.nameProduct} size={16} As="p" color={EColor.greenDark}>
                  {elem.nameProduct}
                </Text>
              </div>
              <Text className={styles.amountProduct} size={16} As="p" color={EColor.greenDark}>{`${elem.amount} ${
                elem.unit
              }, ${elem.price * Number(elem.amount)} тнг`}</Text>
            </li>
          )
        })} */}
      </ul>
      <div className={styles.containerText}>
        <Text className={`${styles.text}`} color={EColor.greenDark} size={16} As="p">
          {'Итого:'}
        </Text>
        <Text className={`${styles.text}`} color={EColor.greenDark} size={16} As="p">{`${fullPrice} тнг`}</Text>
      </div>
      <div className={styles.buttonContent}>
        <Link to={`/pageProducts/${type}/${id}/reserve`} className={styles.button}>
          <Text color={EColor.white} mobileSize={16} size={20}>
            Продолжить оформление
          </Text>
        </Link>
      </div>
      <div className={styles.linkAdd}>
        <Link to={`/pageProducts/${type}/${id}`} className={styles.buttonAdd}>
          <Text color={EColor.greenLight} mobileSize={16} size={20}>
            Добавить еще
          </Text>
        </Link>
      </div>
    </div>
  )
}
