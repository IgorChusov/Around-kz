import React, { useState } from 'react'
import { ButtonBack } from '../../components/ButtonBack'
import { DualRadio } from '../../components/DualRadio'
import { LinkNextPage } from '../../components/LinkNextPage'
import { EColor, Text } from '../../components/Text'

import styles from './selectionservicespage.css'

export function SelectionServicesPage () {
  const [value, setValue] = useState('service')

  function changeValue (event: any) {
    setValue(event?.target.value)
  }

  return (
    <div className={styles.container}>
      <ButtonBack addressLink={'/menu/account/personal'} className={styles.btn} />
      <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
        Создание новой страницы
      </Text>
      <DualRadio
        classNameForm={styles.form}
        firstTextLabel="Я оказываю услугу"
        secondTextLabel="Я продаю товар"
        firstValue="service"
        secondValue="buy"
        selectValue={value}
        changeValue={changeValue}
        descriptionFirst={'Вы оказываете услуги (маникюр, услуги няни, сиделки, массажиста)'}
        descriptionSecond={'Вы продаёте товары (сетевой маркетинг, пельмени домашние, одежда и т.д.)'}
      />
      <LinkNextPage addressPage={`/menu/account/business/createServices/selection/${value}`} text="Далее" />
    </div>
  )
}