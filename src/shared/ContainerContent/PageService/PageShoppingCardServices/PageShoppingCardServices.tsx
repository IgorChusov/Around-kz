import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { servicesListShopping, TServicesListShopping } from '../../../../store/actionCreator/servicesShoppingList'
import { RootState } from '../../../../store/reducer'
import { ButtonBack } from '../../../universalComponent/ButtonBack'
import { IconCancel } from '../../../Icons/IconCancel'
import { EColor, Text } from '../../../universalComponent/Text'
import styles from './pageshoppingcardservices.css'
import { useToken } from '../../../../hooks/useToken'
import { TListServices } from '../PageService'

interface IPageShoppingCardServices {
  list?: []
  id: string
}

export function PageShoppingCardServices (props: IPageShoppingCardServices) {
  const dispatch = useDispatch()
  const {tokenLocalStorage, token} = useToken()

  const servicesData = useSelector<RootState, TServicesListShopping>((state) => state.servicesListShopping)

  const clickDelete = (index: number, ls: TListServices[]) => {
    ls.splice(index, 1)
    const fullPrice = ls.reduce((sum, order) => sum + Number(order.price), 0)
    dispatch(
      servicesListShopping({
        id: '123',
        date: servicesData.date,
        time: servicesData.time,
        fullPrice: fullPrice,
        list: ls,
      }),
    )
  }

  return (
    <div className={styles.container}>
      <ButtonBack addressLink={`/pageService/${props.id}`} className={styles.buttonBack} />
      <Text As="h2" className={styles.title} color={EColor.greenDark} size={20}>
        {'Вы выбрали'}
      </Text>
      <ul className={styles.list}>
        {servicesData.list?.map((elem, index, ls) => {
          return (
            <li key={elem.id} className={styles.item}>
              <div className={styles.nameItemGroup}>
                <button
                  onClick={() => {
                    clickDelete(index, ls)
                  }}
                  className={styles.itemButton}
                >
                  <IconCancel />
                </button>
                <Text className={styles.textName} color={EColor.greenMiddle} As="p" size={16}>
                  {elem.title}
                </Text>
              </div>
              <Text color={EColor.greenMiddle} size={16}>{`${elem.price}тнг`}</Text>
            </li>
          )
        })}
      </ul>
      <Text className={styles.subtitle} As="h3" color={EColor.greenDark} size={20}>
        Дата записи и время
      </Text>
      <div className={styles.infoContainer}>
        <div className={styles.textGroup}>
          <Text className={styles.textWeight} size={20}>
            Число:
          </Text>
          <Text size={16}>{servicesData.date}</Text>
        </div>
        <div className={styles.textGroup}>
          <Text className={styles.textWeight} size={20}>
            Время:
          </Text>
          <Text size={16}>{servicesData.time}</Text>
        </div>
      </div>
      {(!token && !tokenLocalStorage)  && (
        <Text color={EColor.greenDark} As="p" className={styles.textInfo} size={20}>
          Зарегистрируйтесь, чтобы забронировать время
        </Text>
      )}
      <Link to={!token && !tokenLocalStorage ? '/menu' : 'buyCart/payment'} className={styles.btn}>
        <Text color={EColor.white} size={20}>
          {(!token && !tokenLocalStorage) ? 'Регистрация' : 'Забронировать'}
        </Text>
      </Link>
    </div>
  )
}
