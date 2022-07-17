import React, { useState } from 'react'

import { getDateFromSelect } from '../../../../../../../utils/js/calendar'
import { ButtonBack } from '../../../../../../universalComponent/ButtonBack'
import { ButtonNextPage } from '../../../../../../universalComponent/ButtonNextPage'
import { CreatableSelectUniversal } from '../../../../../../universalComponent/CreatableSelectUniversal'
import { DualRadio } from '../../../../../../universalComponent/DualRadio'
import { EColor, Text } from '../../../../../../universalComponent/Text'

import styles from './pagecreateordermoreinformation.css'

export function PageCreateOrderMoreInformation () {
  const datesOptions = getDateFromSelect()

  // first, forever
  const [value, setValue] = useState<'first' | 'forever'>('first')
  const [selectedOptionsFor, setSelectedOptionsFor] = useState(datesOptions[0])
  const [selectedOptionsTo, setSelectedOptionsTo] = useState(datesOptions[5])

  return (
    <div className={styles.container}>
      <ButtonBack addressLink="/menu/account/create-order/basic-info" />
      <Text color={EColor.greenDark} className={styles.title} As="h2" size={24}>
        Добро пожаловать, Имя!
      </Text>
      <Text color={EColor.greenDark} className={styles.subtitle} As="h3" size={16}>
        Добавьте больше информации для получения лучших предложений
      </Text>
      <DualRadio
        classNameForm={styles.form}
        firstTextLabel="Единовременный заказ"
        secondTextLabel="Отслеживать всегда"
        firstValue="first"
        secondValue="forever"
        selectValue={value}
        changeValue={(event) => setValue(event?.target.value)}
      />
      <Text color={EColor.greenDark} className={styles.subtitle} size={16} As="h3">
        К какой дате Вам хочется получить заказ?
      </Text>
      <div className={styles.containerSelect}>
        <div className={styles.select}>
          <Text size={16}>От</Text>
          <CreatableSelectUniversal
            handleCreate={() => {}}
            className={styles.select}
            selectedValue={selectedOptionsFor}
            listOptions={datesOptions}
            onChangeOption={(e) => {
              setSelectedOptionsFor(e)
            }}
          />
        </div>
        <div className={styles.select}>
          <Text size={16}>От</Text>
          <CreatableSelectUniversal
            handleCreate={() => {}}
            className={styles.select}
            selectedValue={selectedOptionsTo}
            listOptions={datesOptions}
            onChangeOption={(e) => {
              setSelectedOptionsTo(e)
            }}
          />
        </div>
      </div>
      <ButtonNextPage classNameButton={styles.button} text="Создать заказ" onClick={() => {}} />
    </div>
  )
}
