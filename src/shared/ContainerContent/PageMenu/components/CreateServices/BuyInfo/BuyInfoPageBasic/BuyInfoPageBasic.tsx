import React, { ChangeEvent, FormEvent } from 'react'

import { EColor, Text } from '../../../../../../universalComponent/Text'

import styles from './buyinfopagebasic.css'

interface IServicesInfoPageBasic {
  handleSubmit: (e: FormEvent) => void
  valueName: string
  changeValueName: (e: ChangeEvent<HTMLInputElement>) => void
  valueAddress: string
  changeValueAddress: (e: ChangeEvent<HTMLInputElement>) => void
}

export function BuyInfoPageBasic ({ 
  handleSubmit,
  valueName, 
  changeValueName,
  valueAddress, 
  changeValueAddress,
}: IServicesInfoPageBasic) {
  return (
    <div className={styles.container}>
      <Text className={styles.title} As="h2" color={EColor.greenDark} size={24}>
        Заполните информацию о себе
      </Text>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <div className={styles.inputContainer}>
            <input 
              value={valueName}
              onChange={(e) => changeValueName(e)}
              className={styles.input} 
              id={'inputActivity'} 
              type="text" 
            />
            <label className={styles.label} htmlFor="inputActivity">
              Вид деятельности
            </label>
          </div>
          <div className={styles.inputContainer}>
            <input 
              value={valueAddress}
              onChange={(e) => changeValueAddress(e)}
              className={styles.input} 
              id={'inputAddress'} 
              type="text" 
            />
            <label className={styles.label} htmlFor="inputAddress">
              Адрес
            </label>
          </div>
        </div>
        <Text As="p" className={styles.textInfo} color={EColor.greenDark} size={16}>
          По каким словам вас смогут найти в поиске?
        </Text>
        <div className={styles.inputTagContainer}>
          <input 
            // value={valueTags}
            // onChange={(e) => changeValueTags(e)}
            placeholder="#тег" 
            id={'inputTag'} 
            className={styles.inputTag} 
            type="text" 
          />
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
        <button className={styles.btnNextPage}>
          Далее
        </button>
      </form>
    </div>
  )
}
