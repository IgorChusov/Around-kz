import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router'

import { ButtonBack } from '../../../../../universalComponent/ButtonBack'

import styles from './buyinfo.css'
import { BuyInfoPageBasic } from './BuyInfoPageBasic'
import { ListProducts } from './components/ListProducts'
import { PageSelectProduct } from './components/PageSelectedProduct'
import { PageSettingScheduleBringing } from './components/PageSettingScheduleBringing'
import { PageSettingScheduleStore } from './components/PageSettingScheduleStore'
import { InformationBuyPage } from './InformationBuyPage'

const listValueLocationDefault = [
  {
    value: 'me',
    textLabel: 'У себя',
    checked: false,
  },
  {
    value: 'client',
    textLabel: 'С выездом',
    checked: false,
  },
]

export function BuyInfo () {
  const history = useHistory()
  const location = useLocation().pathname
  const refPresentation = useRef<HTMLDivElement>(null)
  // состояния чекбоксов выбора места предоставления услуг
  const [listValueLocation, setListValueLocation] = useState(listValueLocationDefault)
  // const [valueLocation, setValueLocation] = useState('me');
  function changeValueLocation (position: number) {
    console.log(position)
    const newListValue = listValueLocation.map((elem, index) =>
      position === index ? { value: elem.value, textLabel: elem.textLabel, checked: !elem.checked } : elem,
    )
    setListValueLocation(newListValue)
  }
  console.log(listValueLocation)
  // состояния импутов на второй странице
  const [valueInputName, setValueInputName] = useState('')
  const [valueInputPrice, setValueInputPrice] = useState('')
  const [valueTextAreaInfoBuy, setValueTextAreaInfoBuy] = useState('')
  const [valueAvailableQuantity, setValueAvailableQuantity] = useState('')
  const [valueInputMin, setValueInputMin] = useState('')
  const [valueSelect, setValueSelect] = useState('')
  // функции измененй состояний полей на второй странице
  function handleSubmitForm (e: FormEvent) {
    e.preventDefault()
    history.push('/menu/account/business/createServices/selection/buy/listProduct')
  }

  function handleChangeValueInputName (e: ChangeEvent<HTMLInputElement>) {
    setValueInputName(e.target.value)
  }

  function handleChangeValueInputPrice (e: ChangeEvent<HTMLInputElement>) {
    setValueInputPrice(e.target.value)
  }

  function handleChangeValueTextAreaInfoBuy (e: ChangeEvent<HTMLTextAreaElement>) {
    setValueTextAreaInfoBuy(e.target.value)
  }

  function handleChangeInputAvailableQuantity (e: ChangeEvent<HTMLInputElement>) {
    setValueAvailableQuantity(e.target.value)
  }

  function handleChangeInputMin (e: ChangeEvent<HTMLInputElement>) {
    setValueInputMin(e.target.value)
  }
  function handleChangeSelect (e: ChangeEvent<HTMLSelectElement>) {
    setValueSelect(e.target.value)
  }
  //
  useEffect(() => {
    if (location === '/menu/account/business/createServices/selection/buy') {
      if (refPresentation.current) {
        refPresentation.current.style.transform = 'translateX(0)'
      }
    } else if (location === '/menu/account/business/createServices/selection/buy/selectionType') {
    } else {
      if (refPresentation.current) {
        refPresentation.current.style.transform = 'translateX(122%)'
      }
    }
  }, [location])
  return (
    <div className={styles.container}>
      {location === '/menu/account/business/createServices/selection/buy' ||
        (location === '/menu/account/business/createServices/selection/buy/add' && (
          <div className={styles.presentation}>
            <div ref={refPresentation} className={styles.presentationChecked}></div>
          </div>
        ))}
      <Switch>
        <Route path={'/menu/account/business/createServices/selection/buy/store'}>
          <PageSettingScheduleStore
            listValueCheckboxLocation={listValueLocation}
            changeValueCheckboxLocation={changeValueLocation}
            selectedValueTransportUnit=""
            selectedValueTransportCapacity={3}
            addressLinkBack="/menu/account/business/createServices/selection/buy/selectionType"
          />
        </Route>
        <Route path={'/menu/account/business/createServices/selection/buy/bringing'}>
          <PageSettingScheduleBringing
            listValueCheckboxLocation={listValueLocation}
            changeValueCheckboxLocation={changeValueLocation}
            selectedValueTransportUnit=""
            selectedValueTransportCapacity={3}
            addressLinkBack="/menu/account/business/createServices/selection/buy/selectionType"
          />
        </Route>
        <Route path={'/menu/account/business/createServices/selection/buy/selectionType'}>
          <PageSelectProduct />
        </Route>
        <Route path={'/menu/account/business/createServices/selection/buy/add'}>
          <ButtonBack
            className={styles.btn}
            addressLink={'/menu/account/business/createServices/selection/buy/listProduct'}
          />
          <InformationBuyPage
            handleSubmitForm={handleSubmitForm}
            valueName={valueInputName}
            handleChangeValueName={handleChangeValueInputName}
            valuePrice={valueInputPrice}
            handleChangeValuePrice={handleChangeValueInputPrice}
            valueTextArea={valueTextAreaInfoBuy}
            handleChangeValueTextArea={handleChangeValueTextAreaInfoBuy}
            valueAvailableQuantity={valueAvailableQuantity}
            handleChangeValueAvailableQuantity={handleChangeInputAvailableQuantity}
            valueInputMin={valueInputMin}
            handleChangeValueInputMin={handleChangeInputMin}
            valueSelect={valueSelect}
            handleChangeSelect={handleChangeSelect}
          />
        </Route>
        <Route path={'/menu/account/business/createServices/selection/buy/listProduct'}>
          <ButtonBack
            addressLink={'/menu/account/business/createServices/selection/buy'}
            className={styles.btn}
            handleClick={() => {}}
          />
          <ListProducts linkAddNewProduct="/menu/account/business/createServices/selection/buy/add" />
        </Route>
        <Route path={'/menu/account/business/createServices/selection/buy'}>
          <ButtonBack
            addressLink="/menu/account/business/createServices/selection"
            className={styles.btn}
            handleClick={() => {}}
          />
          <BuyInfoPageBasic
            handleSubmit={() => {
              history.push('/menu/account/business/createServices/selection/buy/listProduct')
            }}
          />
        </Route>
      </Switch>
    </div>
  )
}
