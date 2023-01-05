import React, { useEffect, useState } from 'react';
import { generateRandomString } from '../../../utils/js/generateRandomIndex';
import { SelectMonth, TListOptionsMonth } from './SelectMonth'
import { SelectYear, TListOptionsYears } from './SelectYear'
import { getActualMonth, getListYearsForSelect, getMonthDate } from '../../../utils/js/calendar';
import styles from './calendar.css';

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

interface IProps {
  handleClick: (value: Date) => void
}

export function Calendar({handleClick}: IProps) {
  const [selectedMonth, setSelectedMonth] = useState(0)
  const [selectedYear, setSelectedYear] = useState(0)
  const [monthDate, setMonthDate] = useState<TResult[][]>([])
  const [optionsYears, setOptionsYears] = useState<TListOptionsYears>([])
  const [optionsMonth, setOptionsMonth] = useState<TListOptionsMonth>(Month)
  
  const changeMonth = (e: { value: number; label: string }) => {
    setSelectedMonth(e.value)
  }
  const changeYear = (e: { value: number; label: string }) => {
    setSelectedYear(e.value)
  }

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
  
  return (
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
                      onClick={() => handleClick(date)}
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
  );
}
