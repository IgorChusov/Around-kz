import React, { ChangeEvent, FormEvent } from 'react'

import { Text, EColor } from '../../../../../../../universalComponent/Text'

import styles from './informationbuypage.css'

interface InformationBuyPage {
  valueName: string
  handleChangeValueName: (e: ChangeEvent<HTMLInputElement>) => void
  valuePrice: string
  handleChangeValuePrice: (e: ChangeEvent<HTMLInputElement>) => void
  valueTextArea: string
  handleChangeValueTextArea: (e: ChangeEvent<HTMLTextAreaElement>) => void
  valueAvailableQuantity: string
  handleChangeValueAvailableQuantity: (e: ChangeEvent<HTMLInputElement>) => void
  valueInputMin: string
  handleChangeValueInputMin: (e: ChangeEvent<HTMLInputElement>) => void
  valueSelect: string
  handleChangeSelect: (e: ChangeEvent<HTMLSelectElement>) => void
  handleSubmitForm: (e: FormEvent) => void
}

export function InformationBuyPage (props: InformationBuyPage) {
  return (
    <div className={styles.container}>
      <Text className={styles.title} As="h2" size={24}>
        Добавьте новый товар
      </Text>
      <form onSubmit={props.handleSubmitForm} className={styles.form} action="">
        <div className={styles.inputGroup}>
          <div className={styles.inputContainer}>
            <input
              onChange={props.handleChangeValueName}
              value={props.valueName}
              className={styles.input}
              id={'inputActivity'}
              type="text"
            />
            <label className={styles.label} htmlFor="inputActivity">
              Название товара
            </label>
          </div>
          <div className={styles.inputChangeContainer}>
            <input
              onChange={props.handleChangeValuePrice}
              value={props.valuePrice}
              className={styles.input}
              id={'inputAddress'}
              type="text"
            />
            <label className={styles.label} htmlFor="inputAddress">
              Стоимость
            </label>
            <select
              onChange={props.handleChangeSelect}
              value={props.valueSelect}
              className={styles.inputGroupSelect}
              name=""
              id=""
            >
              <option value="кг">кг</option>
              <option value="ящик">ящик</option>
              <option value="коробка">коробка</option>
              <option value="пакет">пакет</option>
            </select>
          </div>
        </div>
        <Text color={EColor.greenDark} className={styles.textInfo} As="h3" size={16}>
          Описание вашего товара
        </Text>
        <div className={styles.textareaContainer}>
          <textarea
            onChange={props.handleChangeValueTextArea}
            value={props.valueTextArea}
            id={'textareaInfoService'}
            className={styles.textarea}
            placeholder="Описание товара, его качества, свойства и тд."
          ></textarea>
          <label className={styles.labelTag} htmlFor="textareaInfoService">
            Не более 500 знаков
          </label>
        </div>
        <Text color={EColor.greenDark} className={styles.textInfo} As="h3" size={16}>
          Количество в наличии
        </Text>
        <div className={styles.inputGroup}>
          <input
            value={props.valueAvailableQuantity}
            onChange={props.handleChangeValueAvailableQuantity}
            className={styles.inputGroupInput}
            type="text"
          />
          <select
            onChange={props.handleChangeSelect}
            value={props.valueSelect}
            className={styles.inputGroupSelect}
            name=""
            id=""
          >
            <option value="кг">кг</option>
            <option value="ящик">ящик</option>
            <option value="коробка">коробка</option>
            <option value="пакет">пакет</option>
          </select>
        </div>
        <Text color={EColor.greenDark} className={styles.textInfo} As="h3" size={16}>
          Установите минимальный размер заказа
        </Text>
        <div className={styles.inputGroup}>
          <input
            value={props.valueInputMin}
            onChange={props.handleChangeValueInputMin}
            className={styles.inputGroupInput}
            type="text"
          />
          <select
            onChange={props.handleChangeSelect}
            value={props.valueSelect}
            className={styles.inputGroupSelect}
            name=""
            id=""
          >
            <option value="кг">кг</option>
            <option value="ящик">ящик</option>
            <option value="коробка">коробка</option>
            <option value="пакет">пакет</option>
          </select>
        </div>
        <div className={styles.inputFileContainer}>
          <input className={styles.inputFile} name="file" id={'inputFile'} accept="image/*" multiple type="file" />
          <label className={styles.inputFileBtn} htmlFor="inputFile">
            <span>Загрузить фото</span>
          </label>
          <label className={styles.labelTag} htmlFor="inputFile">
            Не более 5 фотографий
          </label>
        </div>
        <button className={styles.btnNextPage} onClick={() => {}}>
          Сохранить
        </button>
      </form>
    </div>
  )
}
