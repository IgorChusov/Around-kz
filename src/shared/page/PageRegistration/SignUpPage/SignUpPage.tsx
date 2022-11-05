import React, { FormEvent, useEffect, useRef, useState, useImperativeHandle } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames';
import InputMask from 'react-input-mask';
import { RootState } from '../../../../store/reducer'
import { RegisterSmsActivateAsync, RegisterUserAsync } from '../../../../store/token/action'
import { TokenState } from '../../../../store/token/reduser'
import { ButtonNextPage } from '../../../components/ButtonNextPage'
import { ErrorPanel, IErrorPanel } from '../../../components/ErrorPanel'
import { Input } from '../../../components/Input'
import { Text } from '../../../components/Text'
import { SmsActivatePage } from '../SmsActivatePage/SmsActivatePage'
import { Loading } from '../../../components/Loading'
import { usePosition } from '../../../../hooks/usePosition'
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form'
import styles from '../pageregistration.css'

interface Is {
  latitude?: string
  longitude?: string
  error: any
}

export function SignUpPage () {
  const { latitude, longitude, error }: Is = usePosition()
  const ref = useRef<HTMLFormElement>(null)
  const dispatch = useDispatch()
  const token = useSelector<RootState, TokenState>((state) => state.token)

  const [valueFirst, setValueFirst] = useState('')
  const [valueSecond, setValueSecond] = useState('')
  const [valueThird, setValueThird] = useState('')
  const [valueFourth, setValueFourth] = useState('')

  const { control, handleSubmit, formState, register, watch, setValue, getValues } = useForm({
    defaultValues: {
      username: '',
      phone: ''
    }
});

  const dateErrorBasic = [
    { name: 'name', text: '', valid: true },
    { name: 'phone', text: '', valid: true },
    { name: 'activate', text: '', valid: true },
  ]

  // сотояния импутов
  const [arrError, setArrError] = useState<IErrorPanel[]>(dateErrorBasic)

  // activate, inputInfo
  const [page, setPage] = useState('inputInfo')

  const changeError = (text: string, index: number, valid: boolean) => {
    arrError[index].text = text
    arrError[index].valid = valid
    const newArrError = arrError.concat()
    setArrError(newArrError)
  }

  const handleClick = async (e: FormEvent) => {
    e.preventDefault()

    if (ref.current) {
      ref.current.handleSubmitForm();
    }
  }

  useEffect(()=>{
    if (token.error === 'This number is already registered') {
      changeError('Аккаунт с таким номером уже существует', 1, false)
    } else (
      changeError('', 1, true)
    )
  }, [token.error])

  const handleClickActivate = async (e: FormEvent) => {
    e.preventDefault()
    if(!latitude || !longitude) return
    dispatch(RegisterSmsActivateAsync(getValues('phone'), getValues('username'),`${valueFirst}${valueSecond}${valueThird}${valueFourth}`, [Number(latitude), Number(longitude)]))
   
  }
  
  const onSubmit = async ( data: any) => {
    const respToken = await dispatch(RegisterUserAsync(data))
    if (!!respToken) {
      setPage('activate')
    }
  }

  // @ts-ignore:next-line
  useImperativeHandle(ref, () => ({
    handleSubmitForm: () => {
        handleSubmit((data) => {
            onSubmit(data);
        })();
    }
  }));

  return (
    <div>
      {page === 'inputInfo' && (
        <div className={styles.content}>
          <Text As="h2" className={styles.title} size={24}>
            Зарегистрироваться
          </Text>
          <form ref={ref} onSubmit={e => e.preventDefault()} className={styles.form}>
            <Controller
              name="username"
              control={control}
              rules={{
                  required: true,
              }}
              render={({field}) => (
                <Input
                  inputRef={field.ref}
                  classNameContainer={classnames(styles.containerInput, {
                    [styles.inputInvalid]: !!formState.errors.username
                  })}
                  value={field.value}
                  placeholder="Имя"
                  onChange={field.onChange}
                  labelText="Как вас зовут"
                  error={!!formState.errors.username ? 'Заполните поле' : undefined}
                />
              )} 
            />
            <Controller
              name="phone"
              control={control}
              rules={{
                  required: true,
              }}
              render={({field}) => (
                <InputMask mask="+70000000000"
                  maskChar={null}
                  // @ts-ignore:next-line
                  formatChars={{
                      '0': '[0-9]'
                  }}
                  {...register(field.name, {
                      required: true,
                      pattern: /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
                  })}
                  {...field}>
                    {(inputProps: ControllerRenderProps) => (
                        <Input
                          inputRef={inputProps.ref}
                          classNameContainer={classnames(styles.containerInput, {
                            [styles.inputInvalid] : !!formState.errors.phone
                          })}
                          value={inputProps.value}
                          placeholder="+7"
                          onChange={inputProps.onChange}
                          labelText="Номер телефона"
                          error={!!formState.errors.phone ? 'Заполните поле' : undefined}
                        />
                    )}
                </InputMask>
              )} 
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
        <SmsActivatePage 
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
