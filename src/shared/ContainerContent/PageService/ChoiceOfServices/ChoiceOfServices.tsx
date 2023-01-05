import React, { ChangeEvent, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { servicesListShopping } from '../../../../store/actionCreator/servicesShoppingList'
import { RootState } from '../../../../store/reducer'
import { generateRandomString } from '../../../../utils/js/generateRandomIndex'
import { PresentationLine } from '../../../components/PresentationLine'
import { EColor, Text } from '../../../components/Text'
import { TListServices } from '../../../routes/ServiceRoutes'
import { CustomCheckbox } from '../CustomCheckbox'

import styles from './choiceofservices.css'

interface IChoiceOfServices {
  listServices: TListServices []
  handleClickNext: () => void
  id: string
}

export type IChecked = {
  [name: string]: boolean
}

export function ChoiceOfServices ({ id, listServices, handleClickNext }: IChoiceOfServices) {
  const dispatch = useDispatch()
  // const price = useSelector<RootState, number>((state) => state.servicesListShopping.fullPrice)

  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    //  идекс с 18 индекса строки
    const idElementOnList = Number(e.target.id.slice(18))
    listServices[idElementOnList].checked = e.target.checked
    const listChecked = listServices.filter((elem) => {
      return elem.checked
    })
    const fullPrice = listChecked.reduce((sum, order) => sum + Number(order.price), 0)
    dispatch(servicesListShopping({ id: id, date: '', time: '', fullPrice: fullPrice, list: listChecked }))
  }

  return (
    <div className={styles.container}>
      <Text As="h2" className={styles.title} color={EColor.greenDark} size={20}>
        {'Запись к мастеру'}
      </Text>
      <PresentationLine />
      <form onChange={handleChange} className={styles.form}>
        <ul className={styles.listServices}>
          {listServices.map((elem, index) => {
            return (
              <li className={styles.listItem} key={generateRandomString()}>
                <CustomCheckbox defaultChecked={elem.checked || false} index={index} name={elem.title} />
                <Text className={styles.itemInfo} size={16}>{`${elem.price}тнг`}</Text>
              </li>
            )
          })}
        </ul>
      </form>
      {/* <Text color={EColor.greenDark} className={styles.text} size={20}>
        {'Итого:'} <span>{`${price} тнг`}</span>
      </Text> */}
      <div className={styles.buttonGroup}>
        <button onClick={handleClickNext} className={`${styles.button} ${styles.buttonNext}`}>
          Далее
        </button>
      </div>
    </div>
  )
}
