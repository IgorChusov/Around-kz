import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Route, Switch, useLocation, useParams } from 'react-router'

import { ButtonBack } from '../../../../universalComponent/ButtonBack'
import { BuyInfoPageBasic } from '../CreateServices/BuyInfo/BuyInfoPageBasic'
import { ListProducts } from '../CreateServices/BuyInfo/components/ListProducts'
import { InformationBuyPage } from '../CreateServices/BuyInfo/InformationBuyPage'

import styles from './changeinfoproduct.css'

export function ChangeInfoProduct () {
  const { id, type, typeService } = useParams<{ id?: string; type?: string; typeService?: string }>()
  const refPresentation = useRef<HTMLDivElement>(null)
  const [title, setTitle] = useState('Заполните информацию о себе')
  const location = useLocation().pathname
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
    console.log('отправлено')
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

  useEffect(() => {
    if (location === `/menu/account/business/myQuestionnaires/products/${type}/${id}/changeInfo`) {
      if (refPresentation.current) {
        refPresentation.current.style.transform = 'translateX(0)'
      }
    } else {
      if (refPresentation.current) {
        refPresentation.current.style.transform = 'translateX(122%)'
      }
    }
  }, [location])
  return (
    <div className={styles.container}>
      {(location === `/menu/account/business/myQuestionnaires/products/${type}/${id}/changeInfo` ||
        location === `/menu/account/business/myQuestionnaires/products/${type}/${id}/changeInfo/components`) && (
        <div className={styles.presentation}>
          <div ref={refPresentation} className={styles.presentationChecked}></div>
        </div>
      )}
      <Switch>
        <Route path={'/menu/account/business/myQuestionnaires/products/:type/:id/changeInfo/components'}>
          <div>
            <ButtonBack
              addressLink={`/menu/account/business/myQuestionnaires/products/${type}/${id}/changeInfo/listProduct`}
              className={styles.btn}
              handleClick={() => {}}
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
          </div>
        </Route>
        <Route path={'/menu/account/business/myQuestionnaires/products/:type/:id/changeInfo/listProduct'}>
          <ButtonBack
            addressLink={`/menu/account/business/myQuestionnaires/products/${type}/${id}`}
            className={styles.btn}
            handleClick={() => {}}
          />
          <ListProducts
            linkAddNewProduct={`/menu/account/business/myQuestionnaires/products/${type}/${id}/changeInfo/components`}
          />
        </Route>
        <Route path={'/menu/account/business/myQuestionnaires/products/:type/:id/changeInfo/'}>
          <ButtonBack
            addressLink={`/menu/account/business/myQuestionnaires/products/${type}/${id}`}
            className={styles.btn}
            handleClick={() => {}}
          />
          <BuyInfoPageBasic handleSubmit={() => {}} />
        </Route>
      </Switch>
    </div>
  )
}
