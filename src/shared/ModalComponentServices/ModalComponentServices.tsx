import React, { ChangeEvent, FormEvent } from 'react'
import ReactDOM from 'react-dom'

import { Text } from '../universalComponent/Text'

import styles from './modalcomponentservices.css'

interface IModalComponentServices {
  idContainer: string
  inputNameValue: string
  inputPriceValue: string
  inputCommentValue: string
  changeInputNameValue: (e: ChangeEvent<HTMLInputElement>) => void
  changeInputPriceValue: (e: ChangeEvent<HTMLInputElement>) => void
  changeInputCommentValue: (e: ChangeEvent<HTMLInputElement>) => void
  handleClickCancel: () => void
  handleClickSave: (e: FormEvent<HTMLFormElement>) => void
  handleChangeForm?: (e: ChangeEvent<HTMLFormElement>) => void
  validationText: string
  unvalidationName: boolean
  unvalidationPrice: boolean
}

export function ModalComponentServices ({
  idContainer,
  inputNameValue,
  inputPriceValue,
  inputCommentValue,
  changeInputNameValue,
  changeInputPriceValue,
  changeInputCommentValue,
  handleClickCancel,
  handleClickSave,
  handleChangeForm,
  validationText,
  unvalidationName,
  unvalidationPrice,
}: IModalComponentServices) {
  const node = document.getElementById(idContainer)
  if (!node) return null
  return ReactDOM.createPortal(
    <div className={styles.container}>
      <Text className={styles.title} As="h2" mobileSize={16} size={24}>
        Компонент услуг
      </Text>
      <form onSubmit={handleClickSave} onChange={handleChangeForm} className={styles.form} action="">
        <div className={styles.inputContainer}>
          <input
            onChange={changeInputNameValue}
            value={inputNameValue}
            className={`${styles.input} ${unvalidationName && styles.unvalidation}`}
            id="input-name-component"
            type="text"
          />
          <label className={styles.label} htmlFor="input-name-component">
            Название компонента
          </label>
        </div>
        <div className={styles.inputContainer}>
          <input
            onChange={changeInputPriceValue}
            value={inputPriceValue}
            className={`${styles.input} ${unvalidationPrice && styles.unvalidation}`}
            id="input-price-service"
            type="text"
          />
          <label className={styles.label} htmlFor="input-price-service">
            Цена за услугу
          </label>
        </div>
        <div className={styles.inputContainer}>
          <input
            onChange={changeInputCommentValue}
            value={inputCommentValue}
            className={styles.input}
            id="input-comment-service"
            type="text"
          />
          <label className={styles.label} htmlFor="input-comment-service">
            Комментарий к услуге
          </label>
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={handleClickCancel} className={`${styles.buttonFirst} ${styles.button}`}>
            <Text mobileSize={16} size={20}>
              Отмена
            </Text>
          </button>
          <button className={`${styles.buttonSecond} ${styles.button}`}>
            <Text mobileSize={16} size={20}>
              Сохранить
            </Text>
          </button>
        </div>
      </form>
      {validationText.length > 1 && (
        <div className={styles.containerTextError}>
          <Text As="p" size={16}>
            {validationText}
          </Text>
        </div>
      )}
    </div>,
    node,
  )
}
