import React, { useState } from 'react'

import { ButtonBack } from '../../../../../../../components/ButtonBack'
import { ButtonNextPage } from '../../../../../../../components/ButtonNextPage'
import { CreatableSelectUniversal } from '../../../../../../../components/CreatableSelectUniversal'
import { DualCheckbox, TDualCheckboxValue } from '../../../../../../../components/DualCheckbox'

import { EColor, Text } from '../../../../../../../components/Text'
import { UniversalSelect } from '../../../../../../../components/UniversalSelect'

import { ElementCheckDays } from './components/ElementCheckDays'
import styles from './pagesettingschedulebringing.css'

interface IPageSettingScheduleBringing {
  addressLinkBack: string
  selectedValueTransportCapacity: number
  selectedValueTransportUnit: string
  listValueCheckboxLocation: TDualCheckboxValue[]
  changeValueCheckboxLocation: (index: number) => void
}

const listOptionsUnitDefault = [
  { value: 'шт', label: 'шт' },
  { value: 'кг', label: 'кг' },
  { value: 'упаковка', label: 'упаковка' },
  { value: 'пакет', label: 'пакет' },
]

const listOptionsAmountDefault = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
  { value: '15', label: '15' },
  { value: '20', label: '20' },
  { value: '30', label: '30' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
  { value: '150', label: '150' },
  { value: '500', label: '500' },
  { value: '1000', label: '1000' },
  { value: '5000', label: '5000' },
  { value: '10000', label: '10000' },
]

const listOptionsTimeDeliveryDefault = [
  { value: '07:00', label: '07:00' },
  { value: '08:00', label: '08:00' },
  { value: '09:00', label: '09:00' },
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '12:00', label: '12:00' },
  { value: '13:00', label: '13:00' },
  { value: '14:00', label: '14:00' },
  { value: '15:00', label: '15:00' },
  { value: '16:00', label: '16:00' },
  { value: '17:00', label: '17:00' },
  { value: '18:00', label: '18:00' },
  { value: '19:00', label: '19:00' },
  { value: '20:00', label: '20:00' },
  { value: '21:00', label: '21:00' },
  { value: '22:00', label: '22:00' },
  { value: '23:00', label: '23:00' },
  { value: '00:00', label: '00:00' },
  { value: '01:00', label: '01:00' },
  { value: '02:00', label: '02:00' },
  { value: '03:00', label: '03:00' },
  { value: '04:00', label: '04:00' },
  { value: '05:00', label: '05:00' },
  { value: '06:00', label: '06:00' },
]

export const dataDaysDefault = [
  { name: 'Пн', checked: false, disabled: false },
  { name: 'Вт', checked: false, disabled: false },
  { name: 'Ср', checked: false, disabled: false },
  { name: 'Чт', checked: false, disabled: false },
  { name: 'Пт', checked: false, disabled: false },
  { name: 'Сб', checked: false, disabled: false },
  { name: 'Вс', checked: false, disabled: false },
]

export function PageSettingScheduleBringing (props: IPageSettingScheduleBringing) {
  //
  const [listDataDays, setListDataDays] =
    useState<{ name: string; checked: boolean; disabled: boolean }[]>(dataDaysDefault)
  const [listDataDaysFinish, setListDataDaysFinish] =
    useState<{ name: string; checked: boolean; disabled: boolean }[]>(dataDaysDefault)
  //
  const [listOptionsUnit, setListOptionsUnit] = useState(listOptionsUnitDefault)
  const [selectedElementUnit, setSelectedElementUnit] = useState(listOptionsUnitDefault[0])
  //
  const [listOptionsAmount, setListOptionsAmount] = useState(listOptionsAmountDefault)
  const [selectedElementAmount, setSelectedElementAmount] = useState(listOptionsAmountDefault[0])
  //
  const [listOptionsTimeDelivery, setListOptionsTimeDelivery] = useState(listOptionsTimeDeliveryDefault)
  const [selectedElementTimeDelivery, setSelectedElementTimeDelivery] = useState(listOptionsTimeDeliveryDefault[0])
  //
  const [listOptionsTimeFinishDelivery, setListOptionsTimeFinishDelivery] = useState(listOptionsTimeDeliveryDefault)
  const [selectedElementTimeFinishDelivery, setSelectedElementTimeFinishDelivery] = useState(
    listOptionsTimeDeliveryDefault[0],
  )
  // селект единицы изерения транспорта

  const changeSelectUnit = (e: { value: string; label: string }) => {
    setSelectedElementUnit(e)
  }
  // селект колличества

  const createValueSelectAmount = (inputValue: string) => {
    if (/[0-9]/.test(inputValue)) {
      setListOptionsAmount([...listOptionsAmountDefault, { value: inputValue, label: inputValue }])
      changeSelectAmount({ value: inputValue, label: inputValue })
    }
  }
  const changeSelectAmount = (e: { value: string; label: string }) => {
    setSelectedElementAmount(e)
  }
  // селект времени привоза
  const changeSelectTimeDelivery = (e: { value: string; label: string }) => {
    setSelectedElementTimeDelivery(e)
  }
  // селект времени окончания приема заявок
  const changeSelectTimeFinishDelivery = (e: { value: string; label: string }) => {
    setSelectedElementTimeFinishDelivery(e)
  }
  // изменение состояния чекбокса выбора даты привоза
  const changeValueCheckedDelivery = (position: number) => {
    const updatedCheckedState = listDataDays.map((item, index) => {
      if (index === position) {
        return { name: item.name, checked: true, disabled: false }
      } else if (index < position) {
        return { name: item.name, checked: false, disabled: false }
      } else {
        return { name: item.name, checked: false, disabled: false }
      }
      // index === position ? {name: item.name, checked: true, disabled: false} : {name: item.name, checked: false, disabled: false}
    })
    const updatedCheckedStateSecond = listDataDays.map((item, index) => {
      if (position !== 0) {
        if (index === position) {
          return { name: item.name, checked: false, disabled: true }
        } else if (index < position) {
          return { name: item.name, checked: false, disabled: false }
        } else {
          return { name: item.name, checked: false, disabled: true }
        }
      } else {
        if (index === position) {
          return { name: item.name, checked: false, disabled: true }
        } else if (index === 4 || index === 5 || index === 6) {
          return { name: item.name, checked: false, disabled: false }
        } else {
          return { name: item.name, checked: false, disabled: true }
        }
      }
    })
    setListDataDays(updatedCheckedState)
    setListDataDaysFinish(updatedCheckedStateSecond)
  }

  const changeValueCheckedDeliveryFinal = (position: number) => {
    const updatedCheckedState = listDataDaysFinish.map((item, index) => {
      if (index === position) {
        return { name: item.name, checked: true, disabled: item.disabled }
      } else {
        return { name: item.name, checked: false, disabled: item.disabled }
      }
    })
    setListDataDaysFinish(updatedCheckedState)
  }

  return (
    <div className={styles.container}>
      <ButtonBack addressLink={props.addressLinkBack} />
      <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
        {'Привоз товара'}
      </Text>
      <div className={styles.selectContainer}>
        <Text As="p" size={16}>
          Укажите вместимость вашего транспорта
        </Text>
        <div className={styles.selectGroup}>
          <CreatableSelectUniversal
            handleCreate={createValueSelectAmount}
            className={styles.select}
            selectedValue={selectedElementAmount}
            listOptions={listOptionsAmount}
            onChangeOption={changeSelectAmount}
          />
          <UniversalSelect
            className={styles.select}
            selectedValue={selectedElementUnit}
            listOptions={listOptionsUnit}
            onChangeOption={changeSelectUnit}
          />
        </div>
      </div>
      <Text className={styles.subTitle} As="h3" color={EColor.greenDark} size={16}>
        {'Выберите дату доставки'}
      </Text>
      <ElementCheckDays
        handleChange={changeValueCheckedDelivery}
        dataDays={listDataDays}
        warningStringOnIdChangeElement="date"
        classNameForm={styles.formDate}
      />
      <div className={styles.selectContainerDate}>
        <Text As="p" size={16}>
          Время доставки
        </Text>
        <UniversalSelect
          className={styles.select}
          selectedValue={selectedElementTimeDelivery}
          listOptions={listOptionsTimeDelivery}
          onChangeOption={changeSelectTimeDelivery}
        />
      </div>
      <Text className={styles.subTitle} As="h3" color={EColor.greenDark} size={16}>
        {'Окончание приема заявок'}
      </Text>
      <ElementCheckDays
        handleChange={changeValueCheckedDeliveryFinal}
        dataDays={listDataDaysFinish}
        warningStringOnIdChangeElement="dateFinish"
        classNameForm={styles.formDate}
      />
      <div className={styles.selectContainerTimeFinish}>
        <Text As="p" size={16}>
          Время окончания приема заявок
        </Text>
        <UniversalSelect
          className={styles.select}
          selectedValue={selectedElementTimeFinishDelivery}
          listOptions={listOptionsTimeFinishDelivery}
          onChangeOption={changeSelectTimeFinishDelivery}
        />
      </div>
      <Text className={styles.subTitle} As="h3" color={EColor.greenDark} size={16}>
        {'Место оказания услуги'}
      </Text>
      <DualCheckbox
        classNameForm={styles.form}
        listCheckbox={props.listValueCheckboxLocation}
        changeValue={props.changeValueCheckboxLocation}
      />
      <ButtonNextPage classNameButton={styles.button} text="Далее" onClick={() => {}} />
    </div>
  )
}
