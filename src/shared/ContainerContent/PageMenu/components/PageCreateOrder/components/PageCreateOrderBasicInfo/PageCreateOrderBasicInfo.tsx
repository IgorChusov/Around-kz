import React, { ChangeEvent, useState } from 'react'
import { useHistory } from 'react-router'

import { ButtonBack } from '../../../../../../universalComponent/ButtonBack'
import { ButtonNextPage } from '../../../../../../universalComponent/ButtonNextPage'
import { CreatableSelectUniversal } from '../../../../../../universalComponent/CreatableSelectUniversal'
import { ErrorPanel } from '../../../../../../universalComponent/ErrorPanel'
import { EColor, Text } from '../../../../../../universalComponent/Text'

import styles from './pagecreateorderbasicinfo.css'

const dateErrorBasic = [
  { name: 'from', text: '', valid: true },
  { name: 'before', text: '', valid: true },
  { name: 'radius', text: '', valid: true },
  { name: 'tags', text: '', valid: true },
]

interface IPageCreateOrderBasicInfo {
  valueTags: string
  valueTo: string
  valueFrom: string
  textareaValue: string
  setTextareaValue: (e: ChangeEvent<HTMLTextAreaElement>) => void
  setValueTags: (e: string) => void
  onChangeInputTo: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeInputFrom: (e: React.ChangeEvent<HTMLInputElement>) => void
  createValueSelectAmount: (e: string) => void
  options: { value: string; label: string }[]
  selectedTrack: { value: string; label: string }
  setSelectedTrack: (e: { value: string; label: string }) => void
}

export function PageCreateOrderBasicInfo ({
  valueTags,
  valueTo,
  valueFrom,
  textareaValue,
  setTextareaValue,
  setValueTags,
  onChangeInputTo,
  onChangeInputFrom,
  createValueSelectAmount,
  setSelectedTrack,
  options,
  selectedTrack,
}: IPageCreateOrderBasicInfo) {
  const history = useHistory()

  // валидация
  const [stateError, setStateError] = useState(dateErrorBasic)

  const clickNext = () => {
    setStateError(dateErrorBasic)

    if (valueFrom.length === 0) {
      stateError[0].text = 'Заполните поле "От"'
      stateError[0].valid = false
    } else {
      stateError[0].text = ''
      stateError[0].valid = true
    }

    if (valueTo.length === 0) {
      stateError[1].text = 'Заполните поле "До"'
      stateError[1].valid = false
    } else {
      stateError[1].text = ''
      stateError[1].valid = true
    }

    if (valueTags.length === 0) {
      stateError[3].text = 'Заполните поле "Теги"'
      stateError[3].valid = false
    } else {
      stateError[3].text = ''
      stateError[3].valid = true
    }

    setStateError(stateError.slice())

    if (!stateError.find((elem) => !elem.valid)) {
      history.push('/menu/account/create-order/more-info')
    }
  }

  return (
    <div className={styles.container}>
      <ButtonBack addressLink="/menu/account/personal" />
      <Text className={styles.title} color={EColor.greenMiddle} As="h2" size={24}>
        Добро пожаловать, Имя!
      </Text>
      <Text className={styles.secondTitle} color={EColor.greenMiddle} As="h2" size={24}>
        Создайте свой первый заказ
      </Text>
      <Text className={styles.subTitle} color={EColor.greenDark} As="h3" size={16}>
        По каким словам вас смогут найти в поиске?
      </Text>
      <div className={styles.inputContent}>
        <input
          value={valueTags}
          onChange={(e) => setValueTags(e.target.value)}
          placeholder="Введите ваши теги"
          className={`${styles.input} ${!stateError[3].valid ? styles.invalid : ''}`}
          id="input-create-order-tags"
          type="text"
        />
        <label className={styles.label} htmlFor="input-create-order-tags">
          Теги разделяйте запятой
        </label>
      </div>
      <Text className={styles.subTitle} color={EColor.greenDark} As="h3" size={16}>
        Стоимость услуги
      </Text>
      <div className={styles.inputGroup}>
        <div className={styles.inputContainer}>
          <label className={styles.labelFrom} htmlFor="input-create-order-from">
            От
          </label>
          <input
            value={valueFrom}
            onChange={(e) => onChangeInputFrom(e)}
            className={`${styles.inputSolid} ${!stateError[0].valid ? styles.invalid : ''}`}
            id="input-create-order-from"
            type="text"
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.labelFrom} htmlFor="input-create-order-before">
            До
          </label>
          <input
            value={valueTo}
            onChange={(e) => onChangeInputTo(e)}
            className={`${styles.inputSolid} ${!stateError[1].valid ? styles.invalid : ''}`}
            id="input-create-order-before"
            type="text"
          />
        </div>
      </div>
      <Text className={styles.subTitle} color={EColor.greenDark} As="h3" size={16}>
        Радиус поиска
      </Text>
      <div className={styles.positionSelect}>
        <CreatableSelectUniversal
          handleCreate={(e) => createValueSelectAmount(e)}
          className={styles.select}
          selectedValue={selectedTrack}
          listOptions={options}
          onChangeOption={(e) => setSelectedTrack(e)}
        />
      </div>
      <Text className={styles.subTitle} color={EColor.greenDark} As="h3" size={16}>
        Описание вашей услуги
      </Text>
      <div className={styles.textareaGroup}>
        <textarea
          value={textareaValue}
          onChange={(e) => setTextareaValue(e)}
          maxLength={500}
          rows={4}
          className={styles.textarea}
          id="textarea-create-order"
        />
        <label className={styles.label} htmlFor="textarea-create-order">
          Не более 500 знаков
        </label>
      </div>
      <ButtonNextPage classNameButton={styles.button} text="Далее" onClick={clickNext} />
      {stateError.find((elem) => !elem.valid) && <ErrorPanel list={stateError} />}
    </div>
  )
}
