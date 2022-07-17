import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { servicesListShopping } from '../../../store/actionCreator/servicesShoppingList'
import { IListCard, RootState } from '../../../store/reducer'

import { NewPaymentMethod } from './components/NewPaymentMethod'
import { PaymentMethods } from './components/PaymentMethods'
import { PaymentSuccess } from './components/PaymentSuccess'

import styles from './pagepay.css'
interface IPagePay {
  addressBack: string
}

export function PagePay (props: IPagePay) {
  // дри состояния страницы отплаты methods, success, addNewCard
  const [page, setPage] = useState('methods')
  const listCard = useSelector<RootState, IListCard>((state) => state.cardsPay)
  const [inputNumberCardValue, setInputNumberCardValue] = useState('')
  const [inputDateCardValue, setInputDateCardValue] = useState('')
  const [inputCodeCardValue, setInputCodeCardValue] = useState('')
  const [inputNameValue, setInputNameValue] = useState('')
  const dispatch = useDispatch()
  const changeInputNumberCard = (e: ChangeEvent<HTMLInputElement>) => {
    setInputNumberCardValue(e.target.value)
  }
  const changeInputDateCard = (e: ChangeEvent<HTMLInputElement>) => {
    setInputDateCardValue(e.target.value)
  }
  const changeInputCodeCard = (e: ChangeEvent<HTMLInputElement>) => {
    setInputCodeCardValue(e.target.value)
  }
  const changeInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(e.target.value)
  }
  const handleClick = () => {
    dispatch({
      type: 'CARDS_LIST',
      list: [
        ...listCard,
        { number: inputNumberCardValue, date: inputDateCardValue, code: inputCodeCardValue, name: inputNameValue },
      ],
    })
    setPage('methods')
  }
  const clickBackMethods = () => {
    setPage('methods')
  }
  const handleClickPay = () => {
    setPage('success')
    dispatch(
      servicesListShopping({
        id: '',
        date: '',
        time: '',
        fullPrice: 0,
      }),
    )
  }
  return (
    <div className={styles.container}>
      {page === 'methods' && (
        <PaymentMethods
          addressBack={props.addressBack}
          clickPay={handleClickPay}
          addNewCard={() => {
            setPage('addNewCard')
          }}
          list={listCard}
        />
      )}
      {page === 'addNewCard' && (
        <NewPaymentMethod
          inputNumberCardValue={inputNumberCardValue}
          changeInputNumberCard={changeInputNumberCard}
          inputCodeCardValue={inputCodeCardValue}
          changeInputCodeCard={changeInputCodeCard}
          inputDateCardValue={inputDateCardValue}
          changeInputDateCard={changeInputDateCard}
          inputNameValue={inputNameValue}
          changeInputName={changeInputName}
          handleClick={handleClick}
          clickBack={clickBackMethods}
        />
      )}
      {page === 'success' && <PaymentSuccess />}
    </div>
  )
}
