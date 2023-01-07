import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { TBusinessmenState } from '../../../../../store/businessman/reducer'
import { RootState } from '../../../../../store/reducer'
import { ButtonBack } from '../../../../components/Buttons/ButtonBack'
import { ButtonNextPage } from '../../../../components/Buttons/ButtonNextPage'
import { EColor, Text } from '../../../../components/Text'
import { RadioInput } from '../../../../components/RadioInput'
import styles from './pagechangevaluepayment.css'

export function AccountChangeValuePaymentPage () {
  const dispatch = useDispatch()
  const history = useHistory()

  const { id, typeService } = useParams<{ id?: string; typeService?: string }>()
  const businessmen = useSelector<RootState, TBusinessmenState>((state) => state.businessmen)

  const refRegulator = useRef<HTMLDivElement>(null)
  const refTrack = useRef<HTMLDivElement>(null)

  // выбранное радио 'full'/'end'/'percent'
  const [radioValue, setRadioValue] = useState('percent')
  const [valueRegulator, setValueRegulator] = useState(10)
  const [changeValueRegulator, setChangeValueRegulator] = useState(10)

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
    if(valueRegulator < 50 && changeValueRegulator !== 10) {
      setChangeValueRegulator(10) 
    } 
    else if (valueRegulator === 100 && changeValueRegulator !== 100) {
      setChangeValueRegulator(100)
    } 
    else if (valueRegulator > 50 && changeValueRegulator !== 50) {
      setChangeValueRegulator(50)
    }  else {
      return
    }
  }, [valueRegulator])


  useEffect(() => {
    if (!refRegulator.current || !refTrack.current) return
    refRegulator.current.style.left =
      valueRegulator - (refRegulator.current.offsetWidth / refTrack.current.offsetWidth) * 100 + '%'
    refRegulator.current?.addEventListener('mousedown', handleDownOnRegulator)
  }, [changeValueRegulator])

  const handleChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value)
  }

  // useEffect(() => {
  //   if(businessmen.data.rule_payment === 'Upon receipt') {
  //     setRadioValue('end')
  //   }

  //   if(businessmen.data.rule_payment === 'Prepayment 10%') {
  //     setRadioValue('percent')
  //     setChangeValueRegulator(10)
  //     setValueRegulator(10)
  //   }

  //   if(businessmen.data.rule_payment === 'Prepayment 50%') {
  //     setRadioValue('percent')
  //     setChangeValueRegulator(50)
  //     setValueRegulator(50)
  //   }

  //   if(businessmen.data.rule_payment === 'Prepayment 100%') {
  //     setRadioValue('full')
  //   }
  // }, 
  // [businessmen.data.rule_payment])

  const handleClick = async  () => {
    const formData = new FormData()
    formData.append('rule_payment', `Prepayment ${changeValueRegulator}%`)
    // await dispatch(ChangeBusinessmenUserAsync(formData))
    history.push(`/menu/account/business/myQuestionnaires/${typeService}/${id}`)
  }

  return (
    <div className={styles.container}>
      {/* <Loading loading={businessmen.loading}/> */}
      <ButtonBack addressLink={`/menu/account/business/myQuestionnaires/${typeService}/${id}`} />
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
            >{`${changeValueRegulator} %`}</Text>
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
      <ButtonNextPage classNameButton={styles.button} text="Сохранить" onClick={handleClick} />
    </div>
  )
}
