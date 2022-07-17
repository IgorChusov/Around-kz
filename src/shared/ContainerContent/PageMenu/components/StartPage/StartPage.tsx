import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

import { useToken } from '../../../../../hooks/useToken'
import { EColor, Text } from '../../../../universalComponent/Text'

import { ButtonEntry } from './ButtonEntry'
import { ButtonRegistration } from './ButtonRegistration'
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
      <ButtonRegistration />
      <Text className={styles.info} size={16} color={EColor.greenDark} As={'p'}>
        Уже есть аккаунт?
      </Text>
      <ButtonEntry />
    </div>
  )
}
