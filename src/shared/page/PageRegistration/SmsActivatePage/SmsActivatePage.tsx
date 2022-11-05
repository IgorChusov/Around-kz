import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { ButtonNextPage } from '../../../components/ButtonNextPage'
import { ErrorPanel, IErrorPanel } from '../../../components/ErrorPanel'
import { Text } from '../../../components/Text'
import styles from './smsactivate.css'

interface ISmsActivate {
  onClick: (e: FormEvent) => void
  onRepeat: (e: FormEvent) => void
  listError: IErrorPanel[]
  valueFirst: string
  valueSecond: string
  valueThird: string
  valueFourth: string
  setValueFirst: (e: string) => void
  setValueSecond: (e: string) => void
  setValueThird: (e: string) => void
  setValueFourth: (e: string) => void
  buttonText: string
}

export function SmsActivatePage (props: ISmsActivate) {
  const timerCurrent: { current: NodeJS.Timeout | null } = useRef(null)
  // рефы импутов
  const ref1 = useRef<HTMLInputElement>(null)
  const ref2 = useRef<HTMLInputElement>(null)
  const ref3 = useRef<HTMLInputElement>(null)
  const ref4 = useRef<HTMLInputElement>(null)
  // разобрать таймер
  const [timer, setTimer] = useState(30)

  useEffect(() => {
    timerCurrent.current = setInterval(() => {
      setTimer((prevState) => prevState - 1)
    }, 1000)

    return () => {
      if (timerCurrent.current) return clearInterval(timerCurrent.current)
    }
  }, [timer])

  useEffect(() => {
    if (timer === 0 && timerCurrent.current) {
      clearInterval(timerCurrent.current)
      setTimer(0)
    }
  }, [timer])

  function handleClickRepeat (e: FormEvent) {
    e.preventDefault()
    setTimer(30)
    timerCurrent.current = setInterval(
      () =>
        setTimer((prevState) => {
          return prevState - 1
        }),
      1000,
    )
    props.onRepeat(e)
  }

  const changeValueFirst = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const len = value.length
    if (value.match(/[0-9]/) || value.match(/^\s*$/)) {
      if (len === 1) {
        props.setValueFirst(e.target.value.substr(0, 1))
        ref2.current?.focus()
      } else if (len === 0) {
        props.setValueFirst('')
      } else if (len > 1) {
        props.setValueFirst(e.target.value.substr(0, 1))
        props.setValueSecond(e.target.value.substr(1, 1))
        props.setValueThird(e.target.value.substr(2, 1))
        props.setValueFourth(e.target.value.substr(3, 1))
      }
    }
  }

  const changeValueSecond = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const len = value.length
    if (len === 1) {
      props.setValueSecond(e.target.value.substr(0, 1))
      ref3.current?.focus()
    } else if (len === 0) {
      props.setValueSecond('')
      ref1.current?.focus()
    }
  }

  const changeValueThird = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const len = value.length
    if (len === 1) {
      props.setValueThird(e.target.value.substr(0, 1))
      ref4.current?.focus()
    } else if (len === 0) {
      props.setValueThird('')
      ref2.current?.focus()
    }
  }

  const changeValueFourth = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const len = value.length
    if (len === 1) {
      props.setValueFourth(e.target.value.substr(0, 1))
    } else if (len === 0) {
      props.setValueFourth('')
      ref3.current?.focus()
    }
  }

  return (
    <div className={styles.container}>
      <Text className={styles.title} As="h2" size={24}>
        Введите 4-х значный код
      </Text>
      <form action="">
        <div className={styles.inputGroup}>
          <input
            ref={ref1}
            onChange={changeValueFirst}
            value={props.valueFirst}
            tabIndex={1}
            autoComplete="one-time-code"
            className={styles.input}
            type="text"
          />
          <input
            ref={ref2}
            maxLength={1}
            onChange={changeValueSecond}
            value={props.valueSecond}
            tabIndex={2}
            className={styles.input}
            type="text"
          />
          <input
            ref={ref3}
            maxLength={1}
            onChange={changeValueThird}
            value={props.valueThird}
            tabIndex={3}
            className={styles.input}
            type="text"
          />
          <input
            ref={ref4}
            maxLength={1}
            onChange={changeValueFourth}
            value={props.valueFourth}
            tabIndex={4}
            className={styles.input}
            type="text"
          />
        </div>
        {timer > 0 && <p className={styles.text}>Отправить код повторно через {timer}</p>}
        {timer === 0 && (
          <button onClick={handleClickRepeat} className={styles.reSubmit}>
            Отправить код повторно
          </button>
        )}
        <ButtonNextPage classNameButton="" onClick={props.onClick} text={props.buttonText} />
      </form>
      {props.listError.find((elem) => elem.name === 'activate' && !elem.valid) && (
        <ErrorPanel list={props.listError.filter((elem) => elem.name === 'activate')} />
      )}
    </div>
  )
}
