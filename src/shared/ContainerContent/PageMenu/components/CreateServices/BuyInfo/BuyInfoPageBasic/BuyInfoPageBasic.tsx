import React, { FormEvent } from 'react'

import { EColor, Text } from '../../../../../../universalComponent/Text'

import styles from './buyinfopagebasic.css'

interface IServicesInfoPageBasic {
  handleSubmit: (e: FormEvent) => void
}

export function BuyInfoPageBasic ({ handleSubmit }: IServicesInfoPageBasic) {
  return (
    <div className={styles.container}>
      <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
        {'Заполните информацию о себе'}
      </Text>
      <form className={styles.form} action="">
        <div className={styles.inputGroup}>
          <div className={styles.inputContainer}>
            <input className={styles.input} id={'inputActivity'} type="text" />
            <label className={styles.label} htmlFor="inputActivity">
              Вид деятельности
            </label>
          </div>
          <div className={styles.inputContainer}>
            <input className={styles.input} id={'inputAddress'} type="text" />
            <label className={styles.label} htmlFor="inputAddress">
              Адрес
            </label>
          </div>
        </div>
        <Text As="p" className={styles.textInfo} color={EColor.greenDark} size={16}>
          По каким словам вас смогут найти в поиске?
        </Text>
        <div className={styles.inputTagContainer}>
          <input placeholder="#тег" id={'inputTag'} className={styles.inputTag} type="text" />
          <label className={styles.labelTag} htmlFor="inputTag">
            Теги разделяйте запятой
          </label>
        </div>
        <Text color={EColor.greenDark} className={styles.textInfo} As="p" size={16}>
          Описание вашей анкеты
        </Text>
        <div className={styles.textareaContainer}>
          <textarea
            id={'textareaInfoService'}
            className={styles.textarea}
            placeholder="Опыт, особенности и тд."
          ></textarea>
          <label className={styles.labelTag} htmlFor="textareaInfoService">
            Не более 500 знаков
          </label>
        </div>
        <button className={styles.btnNextPage} onClick={handleSubmit}>
          Далее
        </button>
      </form>
    </div>
  )
}
