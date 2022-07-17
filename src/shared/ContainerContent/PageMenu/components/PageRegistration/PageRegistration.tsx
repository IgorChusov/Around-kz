import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import MoonLoader from 'react-spinners/MoonLoader'

import { RootState } from '../../../../../store/reducer'
import { RegisterUserAsync } from '../../../../../store/token/action'
import { ButtonNextPage } from '../../../../universalComponent/ButtonNextPage'
import { ErrorPanel, IErrorPanel } from '../../../../universalComponent/ErrorPanel'
import { Input } from '../../../../universalComponent/Input'
import { Text } from '../../../../universalComponent/Text'

import { TokenState } from '../../../../../store/token/reduser'

import { SmsActivate } from './components/SmsActivate'

import styles from './pageregistration.css'

export function PageRegistration ({ addressNextPage }: { addressNextPage: string }) {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const token = useSelector<RootState, TokenState>((state) => state.token)
  const dateErrorBasic = [
    { name: 'name', text: '', valid: true },
    { name: 'phone', text: '', valid: true },
    { name: 'activate', text: '', valid: true },
  ]
  // сотояния импутов
  const [valueName, setValueName] = useState('')
  const [valuePhone, setValuePhone] = useState('')
  const [arrError, setArrError] = useState<IErrorPanel[]>(dateErrorBasic)

  // activate, inputInfo
  const [page, setPage] = useState('inputInfo')

  const override: React.CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  }

  const changeError = (text: string, index: number, valid: boolean) => {
    arrError[index].text = text
    arrError[index].valid = valid
    const newArrError = arrError.concat()
    setArrError(newArrError)
  }

  const functionValidatePhone = () => {
    if (valuePhone.length < 10) {
      changeError('Введите номер телефона', 1, false)
    }
    if (!/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(valuePhone)) {
      changeError('Неверный формат номера телефона', 1, false)
      return false
    }
    changeError('', 1, true)
    return true
  }

  const functionValidateName = () => {
    if (valueName.length < 4) {
      changeError('Минимальная длинна имени 4 символа', 0, false)
      return false
    }
    if (!/^[A-Z][-'a-zA-Z]+$/.test(valueName)) {
      changeError('Недопустимый формат имени', 0, false)
      return false
    }
    changeError('', 0, true)
    return true
  }

  const handleClick = (e: FormEvent) => {
    e.preventDefault()
    const validName = functionValidateName()
    const validPhone = functionValidatePhone()
    dispatch(RegisterUserAsync(valuePhone, valueName))
    if (validName && validPhone && !token.error) {
      setPage('activate')
    }
  }

  const changeValueName = (e: ChangeEvent<HTMLInputElement>) => {
    setValueName(e.target.value.trim())
    changeError('', 0, true)
  }
  const changeValuePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value.match(/[a-z]/) || !value) {
      setValuePhone(e.target.value.trim())
      changeError('', 1, true)
    }
  }

  const handleClickActivate = async (e: FormEvent) => {
    e.preventDefault()
    dispatch(RegisterUserAsync(valuePhone, valueName))
  }

  useEffect(() => {
    if (location.pathname === '/menu/registration' && token.tokenText.length > 12 && arrError[2].valid) {
      history.push('/menu/account')
    }
  }, [token.tokenText])

  return (
    <div>
      {page === 'inputInfo' && (
        <div className={styles.content}>
          <Text As="h2" className={styles.title} size={24}>
            {location.pathname === '/menu/registration' ? 'Зарегистрироваться' : 'Войти'}
          </Text>
          <form className={styles.form}>
            {location.pathname === '/menu/registration' && (
              <Input
                classNameContainer={`${styles.containerInput} ${!arrError[0].valid ? styles.inputInvalid : null}`}
                value={valueName}
                placeholder="Имя"
                onChange={(e) => {
                  changeValueName(e)
                }}
                idInput="registration-input-name"
                labelText="Как вас зовут"
              />
            )}
            <Input
              classNameContainer={`${styles.containerInput} ${!arrError[0].valid ? styles.inputInvalid : null}`}
              value={valuePhone}
              placeholder="+7"
              onChange={(e) => {
                changeValuePhone(e)
              }}
              idInput="registration-input-phone"
              labelText="Номер телефона"
            />
            <ButtonNextPage classNameButton={styles.button} onClick={handleClick} text="Получить смс-код" />
          </form>
          {arrError.find((elem) => !elem.valid) && <ErrorPanel list={arrError} />}
        </div>
      )}
      {page === 'activate' && <SmsActivate listError={arrError} onClick={handleClickActivate} />}
      <MoonLoader color={'red'} loading={true} size={150} />
    </div>
  )
}
