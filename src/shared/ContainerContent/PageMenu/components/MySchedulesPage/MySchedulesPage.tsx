import React, { ChangeEvent, useEffect, useState } from 'react'

import { getActualMonth, getListYearsForSelect, getMonthDate } from '../../../../../utils/js/calendar'
import { generateRandomString } from '../../../../../utils/js/generateRandomIndex'
import { ButtonBack } from '../../../../universalComponent/ButtonBack'
import { EColor, Text } from '../../../../universalComponent/Text'

import styles from './myschedulespage.css'
import { SelectMonth, TListOptionsMonth } from './SelectMonth'
import { SelectYear, TListOptionsYears } from './SelectYear'

const Month = [
  { value: 0, label: 'Январь' },
  { value: 1, label: 'Февраль' },
  { value: 2, label: 'Март' },
  { value: 3, label: 'Апрель' },
  { value: 4, label: 'Май' },
  { value: 5, label: 'Июнь' },
  { value: 6, label: 'Июль' },
  { value: 7, label: 'Август' },
  { value: 8, label: 'Сентябрь' },
  { value: 9, label: 'Октябрь' },
  { value: 10, label: 'Ноябрь' },
  { value: 11, label: 'Декабрь' },
]

type TResult = undefined | Date

export function MySchedulesPage () {
  const [currentDate, setCurrentDate] = useState(new Date())
  // const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(0)
  const [selectedYear, setSelectedYear] = useState<number>(0)
  const [monthDate, setMonthDate] = useState<TResult[][]>([])
  const [optionsYears, setOptionsYears] = useState<TListOptionsYears>([])
  const [optionsMonth, setOptionsMonth] = useState<TListOptionsMonth>(Month)

  useEffect(() => {
    const listOptionsYears = getListYearsForSelect()
    const month = getActualMonth()
    setOptionsYears(listOptionsYears)
    setSelectedMonth(month)
    setSelectedYear(listOptionsYears[0].value)
  }, [])

  useEffect(() => {
    const monthDateStart = getMonthDate(selectedYear, selectedMonth)
    setMonthDate(monthDateStart)
  }, [selectedYear, selectedMonth])

  const changeMonth = (e: { value: number; label: string }) => {
    setSelectedMonth(e.value)
  }
  const changeYear = (e: { value: number; label: string }) => {
    setSelectedYear(e.value)
  }
  return (
    <div className={styles.container}>
      <ButtonBack addressLink="/menu/account/personal" />
      <Text className={styles.title} color={EColor.greenDark} As="h2" size={24}>
        Расписание
      </Text>
      <div className={styles.calendarContainer}>
        <div className={styles.selectContainer}>
          <SelectMonth selectedMonth={selectedMonth} onChangeOption={changeMonth} listOptions={optionsMonth} />
          <SelectYear selectedYear={selectedYear} onChangeOption={changeYear} listOptions={optionsYears} />
        </div>
        <div className={styles.calendar}>
          <table className={styles.table}>
            <tbody className={styles.tableBody}>
              {monthDate.map((week, index) => (
                <tr className={styles.week} key={generateRandomString()}>
                  {week.map((date, index) =>
                    date
                      ? (
                      <td
                        key={`${generateRandomString() + index}`}
                        className={`${styles.day} ${index === 5 || index === 6 ? styles.holyday : ''}`}
                      >
                        {date.getDate()}
                      </td>
                        )
                      : (
                      <td key={`${generateRandomString() + index}`} />
                        ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.containerSchedules}>
        <ul className={styles.listDate}>
          <li className={styles.itemDate}>
            <Text className={styles.textDate} color={EColor.blackVar} size={16}>
              26.01.2022
            </Text>
            <ul className={styles.list}>
              <li className={styles.item}>
                <div className={styles.itemTimeContainer}>
                  <Text color={EColor.blackVar} className={styles.textTime} size={12}>
                    8:00
                  </Text>
                  <div className={styles.line}></div>
                </div>
                <Text className={styles.textName} size={16}>
                  Иванова Катя
                </Text>
                <button className={styles.itemButton}>
                  <Text className={styles.textInfo} color={EColor.greenLight} size={12}>
                    Подробнее
                  </Text>
                </button>
              </li>
              <li className={styles.item}>
                <div className={styles.itemTimeContainer}>
                  <Text color={EColor.blackVar} className={styles.textTime} size={12}>
                    9:00
                  </Text>
                  <div className={styles.line}></div>
                </div>
                <Text className={styles.textName} size={16}>
                  Иванова Катя
                </Text>
                <button className={styles.itemButton}>
                  <Text className={styles.textInfo} color={EColor.greenLight} size={12}>
                    Подробнее
                  </Text>
                </button>
              </li>
              <li className={styles.item}>
                <div className={styles.itemTimeContainer}>
                  <Text color={EColor.blackVar} className={styles.textTime} size={12}>
                    10:00
                  </Text>
                  <div className={styles.line}></div>
                </div>
                <Text className={styles.textName} size={16}>
                  Иванова Катя
                </Text>
                <button className={styles.itemButton}>
                  <Text className={styles.textInfo} color={EColor.greenLight} size={12}>
                    Подробнее
                  </Text>
                </button>
              </li>
            </ul>
          </li>
          <li className={styles.itemDate}>
            <Text className={styles.textDate} color={EColor.blackVar} size={16}>
              27.01.2022
            </Text>
            <ul className={styles.list}>
              <li className={styles.item}>
                <div className={styles.itemTimeContainer}>
                  <Text color={EColor.blackVar} className={styles.textTime} size={12}>
                    8:00
                  </Text>
                  <div className={styles.line}></div>
                </div>
                <Text className={styles.textName} size={16}>
                  Иванова Катя
                </Text>
                <button className={styles.itemButton}>
                  <Text className={styles.textInfo} color={EColor.greenLight} size={12}>
                    Подробнее
                  </Text>
                </button>
              </li>
              <li className={styles.item}>
                <div className={styles.itemTimeContainer}>
                  <Text color={EColor.blackVar} className={styles.textTime} size={12}>
                    9:00
                  </Text>
                  <div className={styles.line}></div>
                </div>
                <Text className={styles.textName} size={16}>
                  Иванова Катя
                </Text>
                <button className={styles.itemButton}>
                  <Text className={styles.textInfo} color={EColor.greenLight} size={12}>
                    Подробнее
                  </Text>
                </button>
              </li>
              <li className={styles.item}>
                <div className={styles.itemTimeContainer}>
                  <Text color={EColor.blackVar} className={styles.textTime} size={12}>
                    10:00
                  </Text>
                  <div className={styles.line}></div>
                </div>
                <Text className={styles.textName} size={16}>
                  Иванова Катя
                </Text>
                <button className={styles.itemButton}>
                  <Text className={styles.textInfo} color={EColor.greenLight} size={12}>
                    Подробнее
                  </Text>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
