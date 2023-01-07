import React, { useState } from 'react'
import { ButtonBack } from '../../../../components/Buttons/ButtonBack'
import { ButtonNextPage } from '../../../../components/Buttons/ButtonNextPage'
import { DualCheckbox, TDualCheckboxValue } from '../../../../components/Inputs/DualCheckbox'
import { Text } from '../../../../components/Text'
import { UniversalSelect } from '../../../../components/Inputs/UniversalSelect'
import { dataDaysDefault } from '../PageSettingScheduleBringing'
import { ElementCheckDays } from '../PageSettingScheduleBringing/components/ElementCheckDays'
import styles from './pagesettingschedulestore.css'

interface IPageSettingScheduleStore {
  addressLinkBack: string
  selectedValueTransportCapacity: number
  selectedValueTransportUnit: string
  listValueCheckboxLocation: TDualCheckboxValue[]
  changeValueCheckboxLocation: (index: number) => void
}

export function PageSettingScheduleStore (props: IPageSettingScheduleStore) {
  const [dataDays, setDataDays] = useState(dataDaysDefault)
  return (
    <div className={styles.container}>
      <ButtonBack addressLink={props.addressLinkBack} />
      <Text As="h2" className={styles.title} size={24}>
        Склад
      </Text>
      <Text As="h3" className={styles.subtitle} size={16}>
        Выберите время и дни доставки
      </Text>
      <ElementCheckDays
        classNameForm={styles.containerDays}
        handleChange={() => {}}
        dataDays={dataDays}
        warningStringOnIdChangeElement="1"
      />
      <Text As="h3" className={styles.subtitle} size={16}>
        Интервал для доставки
      </Text>
      <div className={styles.selectGroup}>
        <div className={styles.selectContainer}>
          <Text className={styles.selectContainerText} size={16}>
            C
          </Text>
          <UniversalSelect
            className=""
            onChangeOption={() => {}}
            selectedValue={{ value: '', label: '' }}
            listOptions={[]}
          />
        </div>
        <div className={styles.selectContainer}>
          <Text className={styles.selectContainerText} size={16}>
            До
          </Text>
          <UniversalSelect
            className=""
            onChangeOption={() => {}}
            selectedValue={{ value: '', label: '' }}
            listOptions={[]}
          />
        </div>
      </div>
      <Text As="h3" className={styles.subtitle} size={16}>
        Выберите время и дни для самовывоза
      </Text>
      <ElementCheckDays
        classNameForm={styles.containerDays}
        handleChange={() => {}}
        dataDays={dataDays}
        warningStringOnIdChangeElement="2"
      />
      <Text As="h3" className={styles.subtitle} size={16}>
        Интервал для доставки
      </Text>
      <div className={styles.selectGroup}>
        <div className={styles.selectContainer}>
          <Text className={styles.selectContainerText} size={16}>
            C
          </Text>
          <UniversalSelect
            className=""
            onChangeOption={() => {}}
            selectedValue={{ value: '', label: '' }}
            listOptions={[]}
          />
        </div>
        <div className={styles.selectContainer}>
          <Text className={styles.selectContainerText} size={16}>
            До
          </Text>
          <UniversalSelect
            className=""
            onChangeOption={() => {}}
            selectedValue={{ value: '', label: '' }}
            listOptions={[]}
          />
        </div>
      </div>
      <Text As="h3" className={styles.subtitle} size={16}>
        Место оказания услуги
      </Text>
      <DualCheckbox
        classNameForm={styles.form}
        changeValue={props.changeValueCheckboxLocation}
        listCheckbox={props.listValueCheckboxLocation}
      />
      <ButtonNextPage classNameButton={styles.button} text="Далее" onClick={() => {}} />
    </div>
  )
}
