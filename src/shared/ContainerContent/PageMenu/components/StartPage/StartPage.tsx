import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

import { useToken } from '../../../../../hooks/useToken'
import { EColor, Text } from '../../../../universalComponent/Text'

import styles from './startpage.css'

export function StartPage () {
  // const token = useSelector<RootState, string>(state => state.token.tokenText);
  const { token, tokenLocalStorage } = useToken()
  const history = useHistory()
  useEffect(() => {
    if (!token) return
    history.push('/menu/account')
  }, [token])

  return (
    <div className={styles.content}>
      <Text className={styles.title} As={'h2'} size={24} color={EColor.greenDark}>
        Рады видеть вас в Around
      </Text>
      <Text className={styles.text} As={'p'} size={16} color={EColor.greenDark}>
        Впервые у нас? Зарегистрируйтесь и получите все преимущества нашего сервиса
      </Text>
      <Link to={'/menu/sign-up'} className={styles.buttonRegistration}>
        Зарегистрироваться
      </Link>
      <Text className={styles.info} size={16} color={EColor.greenDark} As={'p'}>
        Уже есть аккаунт?
      </Text>
      <Link to={'/menu/sign-in'} className={styles.buttonEntry}>
        Войти
      </Link>
    </div>
  )
}
