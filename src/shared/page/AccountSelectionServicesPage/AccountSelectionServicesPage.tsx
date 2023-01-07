import React, { useState } from 'react'
import { ButtonBack } from '../../components/Buttons/ButtonBack'
import { DualRadio } from '../../components/DualRadio'
import { LinkNextPage } from '../../components/LinkNextPage'
import { EColor, Text } from '../../components/Text'
import styles from './selectionservicespage.css'

export function AccountSelectionServicesPage () {
  const [value, setValue] = useState('service')

  function changeValue (event: any) {
    setValue(event?.target.value)
  }

  return (
    <div className={styles.container}>
      <ButtonBack addressLink={'/account/personal'} className={styles.btn} />
      <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
        Создание новой страницы
      </Text>
      <DualRadio
        classNameForm={styles.form}
        firstTextLabel="Я оказываю услугу"
        secondTextLabel="Я продаю товар"
        firstValue="service"
        secondValue="product"
        selectValue={value}
        changeValue={changeValue}
        descriptionFirst={'Вы оказываете услуги (маникюр, услуги няни, сиделки, массажиста)'}
        descriptionSecond={'Вы продаёте товары (сетевой маркетинг, пельмени домашние, одежда и т.д.)'}
      />
      <LinkNextPage addressPage={`/account/createServices/${value}`} text="Далее" />
    </div>
  )
}
