import React, { ChangeEvent } from 'react'

import { ButtonBack } from '../../components/Buttons/ButtonBack'
import { EColor, Text } from '../../components/Text'

import styles from './newpaymentmethod.css'

interface INewPaymentMethod {
  inputNumberCardValue: string
  inputDateCardValue: string
  inputCodeCardValue: string
  inputNameValue: string
  changeInputNumberCard: (e: ChangeEvent<HTMLInputElement>) => void
  changeInputDateCard: (e: ChangeEvent<HTMLInputElement>) => void
  changeInputCodeCard: (e: ChangeEvent<HTMLInputElement>) => void
  changeInputName: (e: ChangeEvent<HTMLInputElement>) => void
  handleClick: () => void
  clickBack: () => void
}

export function NewPaymentMethodPage (props: INewPaymentMethod) {
  return (
    <div className={styles.container}>
      <ButtonBack handleClick={props.clickBack} className={styles.btnBack} />
      <Text className={styles.title} As="h2" size={24}>
        Добавить новый способ оплаты
      </Text>
      <form className={styles.form} action="">
        <div className={styles.inputContainer}>
          <label htmlFor="inputPayCard"> Номер карты</label>
          <input
            onChange={props.changeInputNumberCard}
            value={props.inputNumberCardValue}
            placeholder="1234 5678 9012 3456"
            data-mask="+7 ___ ___-____"
            className={`${styles.input} ${styles.inputCard}`}
            id="inputPayCard"
            type="text"
          />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputContainer}>
            <label htmlFor="inputPayData">Месяц/год</label>
            <input
              onChange={props.changeInputDateCard}
              value={props.inputDateCardValue}
              placeholder="ММ/ГГ"
              className={`${styles.input} ${styles.inputData}`}
              id="inputPayData"
              type="text"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="inputPayCode">CVV/CVC</label>
            <input
              onChange={props.changeInputCodeCard}
              value={props.inputCodeCardValue}
              placeholder="123"
              className={`${styles.input} ${styles.inputCode}`}
              id="inputPayCode"
              type="text"
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="inputPayName">Имя владельца</label>
          <input
            onChange={props.changeInputName}
            value={props.inputNameValue}
            placeholder="PAVEL IVANOV"
            className={`${styles.input} ${styles.inputName}`}
            id="inputPayName"
            type="text"
          />
        </div>
      </form>
      <button onClick={props.handleClick} className={styles.button}>
        <Text color={EColor.white} mobileSize={16} size={20}>
          Добавить карту
        </Text>
      </button>
    </div>
  )
}
