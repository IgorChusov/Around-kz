import React, { ChangeEvent, CSSProperties, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'


import { RootState } from '../../../../../../store/reducer'
import { RegisterSmsActivateAsync, RegisterUserAsync } from '../../../../../../store/token/action'
import { TokenState } from '../../../../../../store/token/reduser'
import { ButtonNextPage } from '../../../../../universalComponent/ButtonNextPage'
import { ErrorPanel, IErrorPanel } from '../../../../../universalComponent/ErrorPanel'
import { Input } from '../../../../../universalComponent/Input'
import { Text } from '../../../../../universalComponent/Text'
import { SmsActivate } from '../SmsActivate/SmsActivate'


import styles from '../pageregistration.css'

import ClipLoader from 'react-spinners/ClipLoader'
import { Loading } from '../../../../../universalComponent/Loading'
import { usePosition } from '../../../../../../hooks/usePosition'

interface Is {
  latitude?: string
  longitude?: string
  error: any
}

export function SignUp () {
  const { latitude, longitude, error }: Is = usePosition()
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const token = useSelector<RootState, TokenState>((state) => state.token)

  const [valueFirst, setValueFirst] = useState('')
  const [valueSecond, setValueSecond] = useState('')
  const [valueThird, setValueThird] = useState('')
  const [valueFourth, setValueFourth] = useState('')

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

  const handleClick = async (e: FormEvent) => {
    e.preventDefault()
    const validName = functionValidateName()
    const validPhone = functionValidatePhone()
    const respToken = await dispatch(RegisterUserAsync(valuePhone, valueName))

    if (validName && validPhone && !!respToken) {
      setPage('activate')
    }
  }

  useEffect(()=>{
    if (token.error === 'This number is already registered') {
      changeError('Аккаунт с таким номером уже существует', 1, false)
    } else (
      changeError('', 1, true)
    )
  }, [token.error])

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
    if(!latitude || !longitude) return
    dispatch(RegisterSmsActivateAsync(valuePhone, valueName,`${valueFirst}${valueSecond}${valueThird}${valueFourth}`, [Number(latitude), Number(longitude)]))
   
  }

  return (
    <div>
      {page === 'inputInfo' && (
        <div className={styles.content}>
          <Text As="h2" className={styles.title} size={24}>
            Зарегистрироваться
          </Text>
          <form className={styles.form}>
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
            <Input
              classNameContainer={`${styles.containerInput} ${!arrError[1].valid ? styles.inputInvalid : null}`}
              value={valuePhone}
              placeholder="+7"
              onChange={(e) => {
                changeValuePhone(e)
              }}
              idInput="registration-input-phone"
              labelText="Номер телефона"
            />
            <ButtonNextPage classNameButton={styles.button} onClick={handleClick} text="Получить смс-код" />
            <Link className={styles.changeMethods} to={'/menu/sign-in'}>
              Sign in
            </Link>
          </form>
          {arrError.find((elem) => !elem.valid) && <ErrorPanel list={arrError} />}
        </div>
      )}
      {page === 'activate' && 
        <SmsActivate 
          listError={arrError}
          onClick={handleClickActivate} 
          onRepeat={handleClick}
          valueFirst={valueFirst}
          valueSecond={valueSecond}
          valueFourth={valueFourth}
          valueThird={valueThird}
          setValueFirst={(e) => setValueFirst(e)}
          setValueSecond={(e) => setValueSecond(e)}
          setValueFourth={(e) => setValueFourth(e)}
          setValueThird={(e) => setValueThird(e)}
          buttonText='Зарегистрироваться'
        />}
        <Loading loading={token.loading} />
    </div>
  )
}
