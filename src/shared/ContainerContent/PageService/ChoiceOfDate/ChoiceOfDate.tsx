import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'

import { servicesListShopping, TServicesListShopping } from '../../../../store/actionCreator/servicesShoppingList'
import { RootState } from '../../../../store/reducer'
import { generateRandomString } from '../../../../utils/js/generateRandomIndex'
import { ButtonBack } from '../../../components/ButtonBack'
import { EColor, Text } from '../../../components/Text'

import styles from './choiceofdate.css'
import { SwiperDate } from './SwiperDate'

const listFull = [
  {
    date: '21.11',
    choiceTime: [
      { time: '11:00', freedom: true },
      { time: '12:00', freedom: false },
      { time: '13:00', freedom: true },
      { time: '14:00', freedom: true },
      { time: '15:00', freedom: true },
      { time: '16:00', freedom: true },
      { time: '17:00', freedom: false },
    ],
  },
  {
    date: '22.11',
    choiceTime: [
      { time: '11:00', freedom: true },
      { time: '12:00', freedom: false },
      { time: '13:00', freedom: true },
      { time: '14:00', freedom: false },
      { time: '15:00', freedom: true },
      { time: '16:00', freedom: true },
      { time: '17:00', freedom: false },
    ],
  },
  {
    date: '23.11',
    choiceTime: [
      { time: '11:00', freedom: false },
      { time: '12:00', freedom: false },
      { time: '13:00', freedom: true },
      { time: '14:00', freedom: true },
      { time: '15:00', freedom: true },
      { time: '16:00', freedom: true },
      { time: '17:00', freedom: false },
    ],
  },
  {
    date: '24.11',
    choiceTime: [
      { time: '11:00', freedom: true },
      { time: '12:00', freedom: false },
      { time: '13:00', freedom: false },
      { time: '14:00', freedom: true },
      { time: '15:00', freedom: true },
      { time: '16:00', freedom: true },
      { time: '17:00', freedom: false },
    ],
  },
  {
    date: '25.11',
    choiceTime: [
      { time: '11:00', freedom: true },
      { time: '12:00', freedom: false },
      { time: '13:00', freedom: true },
      { time: '14:00', freedom: true },
      { time: '15:00', freedom: false },
      { time: '16:00', freedom: true },
      { time: '17:00', freedom: false },
    ],
  },
  {
    date: '26.11',
    choiceTime: [
      { time: '11:00', freedom: true },
      { time: '12:00', freedom: false },
      { time: '13:00', freedom: true },
      { time: '14:00', freedom: true },
      { time: '15:00', freedom: true },
      { time: '16:00', freedom: true },
      { time: '17:00', freedom: false },
    ],
  },
  {
    date: '27.11',
    choiceTime: [
      { time: '11:00', freedom: true },
      { time: '12:00', freedom: false },
      { time: '13:00', freedom: true },
      { time: '14:00', freedom: true },
      { time: '15:00', freedom: true },
      { time: '16:00', freedom: false },
      { time: '17:00', freedom: false },
    ],
  },
]
interface Ife {
  date: string
  choiceTime: {
    time: string
    freedom: boolean
  }[]
}

interface IChoiceOfDate {
  clickBack: () => void
}

export function ChoiceOfDate (props: IChoiceOfDate) {
  const { path, url } = useRouteMatch()
  const dispatch = useDispatch()
  const servicesData = useSelector<RootState, TServicesListShopping>((state) => state.servicesListShopping)
  const date = useSelector<RootState, string>((state) => state.dateReserve)
  const [listTime, setListTime] = useState([{ time: '11:00', freedom: false }])
  const [checkedRadio, setCheckedRadio] = useState('')
  
  useEffect(() => {
    const times = listFull.find((city) => date === city.date)?.choiceTime
    if (times) {
      setListTime(times)
    }
  }, [date])

  function handleChecked (e: ChangeEvent<HTMLInputElement>) {
    setCheckedRadio(e.target.value)
  }
  const clickReserve = () => {
    dispatch(
      servicesListShopping({
        id: servicesData.id,
        date: date,
        time: checkedRadio,
        fullPrice: servicesData.fullPrice,
        list: servicesData.list,
      }),
    )
  }
  return (
    <div className={styles.container}>
      <ButtonBack className={styles.btnBack} handleClick={props.clickBack} />
      <Text As="h2" className={styles.title} color={EColor.greenDark} size={20}>
        {'Выберите дату и время'}
      </Text>
      <SwiperDate list={listFull} />
      <form className={styles.form}>
        <ul className={styles.list}>
          {listTime.map((elem) => {
            const id = `inputTime${generateRandomString()}`
            return (
              <li className={styles.item} key={generateRandomString()}>
                <input
                  onChange={handleChecked}
                  checked={elem.time === checkedRadio}
                  disabled={!elem.freedom}
                  className={styles.input}
                  type="radio"
                  id={id}
                  name="inputTime"
                  value={elem.time}
                />
                <label className={styles.label} htmlFor={id}>
                  {elem.time}
                </label>
              </li>
            )
          })}
        </ul>
      </form>
      <ul className={styles.listMarker}>
        <li className={styles.itemMarker}>
          <div className={`${styles.marker} ${styles.markerOpen}`}></div>
          <Text mobileSize={12} size={14}>
            Свободно
          </Text>
        </li>
        <li className={styles.itemMarker}>
          <div className={`${styles.marker} ${styles.markerClose}`}></div>
          <Text mobileSize={12} size={14}>
            Занято
          </Text>
        </li>
        <li className={styles.itemMarker}>
          <div className={`${styles.marker} ${styles.markerСhoice}`}></div>
          <Text mobileSize={12} size={14}>
            Ваш выбор
          </Text>
        </li>
      </ul>
      <Link to={`${url}/buyCart`} onClick={clickReserve} className={styles.button}>
        <Text color={EColor.white} size={20}>
          Далее
        </Text>
      </Link>
    </div>
  )
}
