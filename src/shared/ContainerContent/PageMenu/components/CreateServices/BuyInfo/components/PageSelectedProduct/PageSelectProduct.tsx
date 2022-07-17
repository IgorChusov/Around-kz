import React, { useState } from 'react'

import { ButtonBack } from '../../../../../../../universalComponent/ButtonBack'
import { DualRadio } from '../../../../../../../universalComponent/DualRadio'
import { LinkNextPage } from '../../../../../../../universalComponent/LinkNextPage'
import { EColor, Text } from '../../../../../../../universalComponent/Text'

import styles from './pageselectproduct.css'

interface IPageSelectProduct {}
export function PageSelectProduct (props: IPageSelectProduct) {
  const [value, setValue] = useState('bringing')
  function changeValue (event: any) {
    setValue(event?.target.value)
  }

  return (
    <div className={styles.container}>
      <ButtonBack addressLink="/menu/account/business/createServices/selection/buy/listProduct" />
      <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
        {'Я продаю товар'}
      </Text>
      <DualRadio
        classNameForm={styles.form}
        firstTextLabel="Привоз"
        secondTextLabel="Склад"
        firstValue="bringing"
        secondValue="store"
        selectValue={value}
        changeValue={changeValue}
        descriptionFirst={
          'Данный тип бронирования подходят для вас, в случае если вы завозите товары сразу одной крупной партией для множества клиентов (обычно это продукты питания, привозимые из близлежащих сёл/аулов)'
        }
        descriptionSecond={
          'Данный тип бронирования подходит для вас, в случае если склад товаров находится у вас дома (сетевой маркетинг, продажа мебели, и т.д.)'
        }
      />
      <LinkNextPage addressPage={`/menu/account/business/createServices/selection/buy/${value}`} text="Далее" />
    </div>
  )
}
