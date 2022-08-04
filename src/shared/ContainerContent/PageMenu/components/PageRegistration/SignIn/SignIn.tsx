import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'

import MoonLoader from 'react-spinners/MoonLoader'
import { RootState } from '../../../../../../store/reducer'
import { TokenState } from '../../../../../../store/token/reduser'
import { ButtonNextPage } from '../../../../../universalComponent/ButtonNextPage'
import { ErrorPanel, IErrorPanel } from '../../../../../universalComponent/ErrorPanel'
import { SmsActivate } from '../SmsActivate'

import styles from '../pageregistration.css'
import { LoginSmsActivateAsync, LoginUserAsync, RegisterUserAsync } from '../../../../../../store/token/action'
import { Input } from '../../../../../universalComponent/Input'
import { Text } from '../../../../../universalComponent/Text'
import { Loading } from '../../../../../universalComponent/Loading'

export function SignIn () {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const token = useSelector<RootState, TokenState>((state) => state.token)

  const [valueFirst, setValueFirst] = useState('')
  const [valueSecond, setValueSecond] = useState('')
  const [valueThird, setValueThird] = useState('')
  const [valueFourth, setValueFourth] = useState('')

  const dateErrorBasic = [
    { name: 'phone', text: '', valid: true },
    { name: 'activate', text: '', valid: true },
    { name: 'server', text: '', valid: true}
  ]

  // сотояния импутов
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
      changeError('Введите номер телефона', 0, false)
    }
    if (!/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(valuePhone)) {
      changeError('Неверный формат номера телефона', 0, false)
      return false
    }
    changeError('', 0, true)
    return true
  }

  const handleClick = async (e: FormEvent) => {
    e.preventDefault()
  
    const validPhone = functionValidatePhone()
    
    const a = await dispatch(LoginUserAsync(valuePhone))
    
    if (validPhone && token.error.length === 0  && !!a) {
      setPage('activate')
    }
  }

  const changeValuePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!value.match(/[a-z]/) || !value) {
      setValuePhone(e.target.value.trim())
      changeError('', 0, true)
    }
  }

  const handleClickActivate = async (e: FormEvent) => {
    e.preventDefault()
    dispatch(LoginSmsActivateAsync(valuePhone,`${valueFirst}${valueSecond}${valueThird}${valueFourth}`))
  }

  useEffect(()=> {
    if(token.error.length > 1) {
      changeError(token.error, 2, false)
    } else {
      changeError('', 2, true)
    }
  }, [token.error])

  return (
    <div>
      {page === 'inputInfo' && (
        <div className={styles.content}>
          <Text As="h2" className={styles.title} size={24}>
            Войти
          </Text>
          <form className={styles.form}>
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
            <Link className={styles.changeMethods} to={'/menu/sign-up'}>
              Sign up
            </Link>
          </form>
          {arrError.find((elem) => !elem.valid) && <ErrorPanel list={arrError} />}
        </div>
      )}
      {page === 'activate' && 
        <SmsActivate 
          listError={arrError}
          onClick={handleClickActivate} 
          valueFirst={valueFirst}
          valueSecond={valueSecond}
          valueFourth={valueFourth}
          valueThird={valueThird}
          setValueFirst={(e) => setValueFirst(e)}
          setValueSecond={(e) => setValueSecond(e)}
          setValueFourth={(e) => setValueFourth(e)}
          setValueThird={(e) => setValueThird(e)}
        />
      }
      <Loading loading={token.loading} />
    </div>
  )
}
