const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const DAYS_IN_WEEK = 7
const Month = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
}

export function isLeapYears (year: number) {
  return !(year % 4 || (!(year % 100) && year % 400))
}

export function getDaysInMouth (date: Date) {
  const month = date.getMonth()
  const year = date.getFullYear()
  const daysInMonth = DAYS_IN_MONTH[month]

  if (isLeapYears(year) && month === Month.February) {
    return daysInMonth + 1
  } else {
    return daysInMonth
  }
}

export function getDayOfWeek (date: Date) {
  const dayOfWeek = date.getDay()
  if (dayOfWeek === 0) return 6
  return dayOfWeek - 1
}

type TResultCalendar = (undefined | Date)[]

export const getMonthDate = (year: number, month: number) => {
  const result: TResultCalendar[] = []
  const date = new Date(year, month)
  const daysInMonth = getDaysInMouth(date)
  const monthStartsOn = getDayOfWeek(date)
  let day = 1
  for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
    result[i] = []
    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
        result[i][j] = undefined
      } else {
        result[i][j] = new Date(year, month, day++)
      }
    }
  }
  return result
}

// функция получения списка селекта год и следующий год
export const getListYearsForSelect = () => {
  const date: Date = new Date()
  const years = date.getFullYear()
  const nextYears = years + 1

  return [
    { value: years, label: `${years}` },
    { value: nextYears, label: `${nextYears}` },
  ]
}

export const getActualMonth = () => {
  const date: Date = new Date()
  const actualMonth = date.getMonth()
  return actualMonth
}

export const getDateFromSelect = () => {
  const days: { value: string; label: string }[] = []
  const date = new Date()
  const actualMonth = date.getMonth()
  const actualYears = date.getFullYear()
  const actualDays = date.getDate()

  function returnDate (dataDays: TResultCalendar[], actualDays = -1) {
    dataDays.map((elem: TResultCalendar) => {
      elem.map((el) => {
        if (!el) return
        if (actualDays > 0 && actualDays > el.getDate()) return
        days.push({
          value: el.toISOString(),
          label: `${new Date(el).getDate() < 10 ? `0${new Date(el).getDate()}` : `${new Date(el).getDate()}`}.${
            new Date(el).getMonth() + 1 <= 9 ? `0${new Date(el).getMonth() + 1}` : `${new Date(el).getMonth() + 1}`
          }`,
        })
      })
    })
  }

  returnDate(getMonthDate(actualYears, actualMonth), actualDays)

  actualMonth === 11
    ? returnDate(getMonthDate(actualYears + 1, 0))
    : returnDate(getMonthDate(actualYears, actualMonth + 1))

  return days
}
