import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

import { ButtonBack } from '../../../../../../../../universalComponent/ButtonBack'
import { ButtonNextPage } from '../../../../../../../../universalComponent/ButtonNextPage'
import { EColor, Text } from '../../../../../../../../universalComponent/Text'

import { RadioInput } from './components/RadioInput'
import styles from './pagechangevaluepayment.css'

export function PageChangeValuePayment () {
  const { id, type, typeService } = useParams<{ id?: string; type?: string; typeService?: string }>()
  // выбранное радио 'full'/'end'/'percent'
  const [radioValue, setRadioValue] = useState('percent')
  const refRegulator = useRef<HTMLDivElement>(null)
  const refTrack = useRef<HTMLDivElement>(null)
  const [valueRegulator, setValueRegulator] = useState(10)

  const handleDownOnRegulator = (event: globalThis.MouseEvent) => {
    event.preventDefault()
    if (!refRegulator.current || !refTrack.current || radioValue !== 'percent') return
    const shiftX = event.clientX - refRegulator.current.getBoundingClientRect().left
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    function onMouseMove (event: globalThis.MouseEvent) {
      if (!refRegulator.current || !refTrack.current) return
      let newLeft = event.clientX - shiftX - refTrack.current.getBoundingClientRect().left

      // курсор вышел из слайдера => оставить бегунок в его границах.
      if (newLeft < 0) {
        newLeft = 0
      }
      const rightEdge = refTrack.current.offsetWidth - refRegulator.current.offsetWidth
      if (newLeft > rightEdge) {
        newLeft = rightEdge
      }
      refRegulator.current.style.left = newLeft + 'px'
      let positionLeft
      if (refRegulator.current.offsetLeft > 0) {
        positionLeft = Math.round(
          ((refRegulator.current.offsetLeft + refRegulator.current.offsetWidth) / refTrack.current.offsetWidth) * 100,
        )
      } else {
        positionLeft = Math.round((refRegulator.current.offsetLeft / refTrack.current.offsetWidth) * 100)
      }
      setValueRegulator(positionLeft)
    }
    function onMouseUp () {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }
  useEffect(() => {
    if (!refRegulator.current || !refTrack.current) return
    refRegulator.current.style.left =
      valueRegulator - (refRegulator.current.offsetWidth / refTrack.current.offsetWidth) * 100 + '%'
    refRegulator.current?.addEventListener('mousedown', handleDownOnRegulator)
  }, [])
  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value)
  }

  return (
    <div className={styles.container}>
      <ButtonBack addressLink={`/menu/account/business/myQuestionnaires/products/store/${id}`} />
      <Text color={EColor.greenDark} className={styles.title} As="h2" size={24}>
        Способы оплаты
      </Text>
      <form action="">
        <RadioInput
          valueTextLabel="Полная предоплата"
          value="full"
          selectValue={radioValue}
          changeValue={handleChangeRadio}
        />
        <RadioInput
          valueTextLabel="Оплата после сделки"
          value="end"
          selectValue={radioValue}
          changeValue={handleChangeRadio}
        />
        <RadioInput
          valueTextLabel="Предоплата в %"
          value="percent"
          selectValue={radioValue}
          changeValue={handleChangeRadio}
        />
      </form>
      <div className={`${styles.containerRegulator} ${radioValue === 'percent' ? '' : styles.disableRegulator}`}>
        <div ref={refTrack} className={styles.line}>
          <div ref={refRegulator} className={styles.regulatorContainer}>
            <div className={styles.regulator}></div>
            <Text
              color={EColor.greenDark}
              className={`${styles.markerTextIndicator} ${styles.markerTextValue}`}
              size={16}
            >{`${valueRegulator} %`}</Text>
          </div>
        </div>
        <div className={styles.markerInfo}>
          <Text color={EColor.greenDark} className={styles.markerText} size={16}>
            0 %
          </Text>
          <Text color={EColor.greenDark} className={styles.markerText} size={16}>
            100%
          </Text>
        </div>
      </div>
      <ButtonNextPage classNameButton={styles.button} text="Сохранить" onClick={() => {}} />
    </div>
  )
}
