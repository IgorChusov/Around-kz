import React, { ChangeEvent, FormEvent, useEffect, useRef, useState, useImperativeHandle } from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { RootState } from '../../../../store/reducer'
import { ButtonNextPage } from '../../../components/Buttons/ButtonNextPage'
import { ErrorPanel, IErrorPanel } from '../../../components/ErrorPanel'
import { Input } from '../../../components/Inputs/Input'
import { Text } from '../../../components/Text'
import { Loading } from '../../../components/Loading'
import { SmsActivatePage } from '../SmsActivatePage'
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form'
import InputMask from 'react-input-mask';
import styles from '../pageregistration.css'
import { TSessionState } from '../../../../store/session/reducer'
import { LoginSmsActivateAsync, LoginUserAsync } from '../../../../store/session/action'

export function SignInPage () {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const ref = useRef<HTMLFormElement>(null)
  const token = useSelector<RootState, TSessionState>((state) => state.session)

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
  const [arrError, setArrError] = useState<IErrorPanel[]>(dateErrorBasic)
  const [errorBottomInput, setErrorBottomInput] = useState('')
  // activate, inputInfo
  const [page, setPage] = useState('inputInfo')

  const { control, handleSubmit, formState, register, watch } = useForm({
    defaultValues: {
      phone: ''
    }
  });

  const value = watch('phone')

  const changeError = (text: string, index: number, valid: boolean) => {
    arrError[index].text = text
    arrError[index].valid = valid
    const newArrError = arrError.concat()
    setArrError(newArrError)
  }

  const handleClickActivate = async (e: FormEvent) => {
    e.preventDefault()
    dispatch(LoginSmsActivateAsync(value,`${valueFirst}${valueSecond}${valueThird}${valueFourth}`))
  }

  useEffect(()=> {
    if(token.error.length > 1) {
      token.error === 'This number is not registered' ? 
        setErrorBottomInput(token.error) :
        changeError(token.error, 2, false)
    } else {
      changeError('', 2, true)
    }
  }, [token.error])

  const onSubmit = async ( data: any) => {
    const respToken = await dispatch(LoginUserAsync(data))
    if (!!respToken && token.error.length === 0) {
      setPage('activate')
    }
  }

  const handleClick = async (e: FormEvent) => {
    e.preventDefault()

    if (ref.current) {
      ref.current.handleSubmitForm();
    }
  }

  useEffect(() => {
   
    setErrorBottomInput('')
  }, [value])

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
            Войти
          </Text>
          <form ref={ref} onSubmit={e => e.preventDefault()} className={styles.form}>
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
                            type="phone"
                            id="input-phone"
                            inputRef={inputProps.ref}
                            classNameContainer={classnames(styles.containerInput, {
                              [styles.inputInvalid]: !!formState.errors.phone
                            })}
                            // value={inputProps.value}
                            placeholder="+7"
                            // onChange={inputProps.onChange}
                            labelText="Номер телефона"
                            error={!!formState.errors.phone && 'Заполните поле' || errorBottomInput.length !== 0 ? 'Аккаунт не найден' : ''}
                            {...inputProps}
                        />
                      )}
                  </InputMask>
                )} 
              />
        
            <ButtonNextPage classNameButton={styles.button} onClick={handleClick} text="Получить смс-код" />
            <Link className={styles.changeMethods} to={'/account/sign-up'}>
              Sign up
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
          buttonText='Войти'
        />
      }
      <Loading loading={token.loading} />
    </div>
  )
}
