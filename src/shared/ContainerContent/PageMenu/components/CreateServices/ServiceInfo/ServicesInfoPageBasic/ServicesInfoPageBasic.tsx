import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'

import { IconElementPlus } from '../../../../../../Icons'
import { EColor, Text } from '../../../../../../universalComponent/Text'

import styles from './servicesinfopagebasic.css'
interface IServicesInfoPageBasic {
  handleSubmit: (e: FormEvent) => void
}

export function ServicesInfoPageBasic ({ handleSubmit }: IServicesInfoPageBasic) {
  const refImg = useRef<HTMLInputElement>(null)
  // импуты
  const [valueActivity, setValueActivity] = useState('')
  const [valueAddress, setValueAddress] = useState('')
  const [valueDescription, setValueDescription] = useState('')
  const [valueTags, setValueTags] = useState('')
  const changeActivity = (e: ChangeEvent<HTMLInputElement>) => {
    setValueActivity(e.target.value)
  }

  const changeAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setValueAddress(e.target.value)
  }

  const changeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValueDescription(e.target.value)
  }

  const changeValueTags = (e: ChangeEvent<HTMLInputElement>) => {
    setValueTags(e.target.value)
  }
  useEffect(() => {
    console.log(refImg?.current?.files)
  }, [])
  console.log(refImg)
  return (
    <form className={styles.form} action="">
      <div className={styles.inputGroup}>
        <div className={styles.inputContainer}>
          <input
            value={valueActivity}
            onChange={(e) => changeActivity(e)}
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
            onChange={(e) => changeAddress(e)}
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
          value={valueTags}
          onChange={(e) => changeValueTags(e)}
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
          value={valueDescription}
          onChange={(e) => changeDescription(e)}
          id={'textareaInfoService'}
          className={styles.textarea}
          placeholder="Опыт, особенности услуг и тд."
        />
        <label className={styles.labelTag} htmlFor="textareaInfoService">
          Не более 500 знаков
        </label>
      </div>
      <div className={styles.inputFileContainer}>
        <input ref={refImg} className={styles.inputFile} name="file" id={'inputFile'} accept="image/*" type="file" />
        <label className={styles.inputFileBtn} htmlFor="inputFile">
          <IconElementPlus classNameSvg={styles.minus} />
          <IconElementPlus classNameSvg={styles.plus} />
        </label>
        <div className={styles.inputFileGroup}>
          <div className={styles.inputSmallContent}>
            <input className={styles.inputFile} name="file" id={'inputFile2'} accept="image/*" type="file" />
            <label className={styles.inputFileBtnSmall} htmlFor="inputFile2">
              <IconElementPlus classNameSvg={styles.minusSmall} />
              <IconElementPlus classNameSvg={styles.plusSmall} />
            </label>
          </div>
          <div className={styles.inputSmallContent}>
            <input className={styles.inputFile} name="file" id={'inputFile3'} accept="image/*" type="file" />
            <label className={styles.inputFileBtnSmall} htmlFor="inputFile3">
              <IconElementPlus classNameSvg={styles.minusSmall} />
              <IconElementPlus classNameSvg={styles.plusSmall} />
            </label>
          </div>
          <div className={styles.inputSmallContent}>
            <input className={styles.inputFile} name="file" id={'inputFile4'} accept="image/*" type="file" />
            <label className={styles.inputFileBtnSmall} htmlFor="inputFile4">
              <IconElementPlus classNameSvg={styles.minusSmall} />
              <IconElementPlus classNameSvg={styles.plusSmall} />
            </label>
          </div>
          <div className={styles.inputSmallContent}>
            <input className={styles.inputFile} name="file" id={'inputFile5'} accept="image/*" type="file" />
            <label className={styles.inputFileBtnSmall} htmlFor="inputFile5">
              <IconElementPlus classNameSvg={styles.minusSmall} />
              <IconElementPlus classNameSvg={styles.plusSmall} />
            </label>
          </div>
        </div>
      </div>
      <button className={styles.btnNextPage} onClick={handleSubmit}>
        Далее
      </button>
      <img src={''} alt="" />
    </form>
  )
}
