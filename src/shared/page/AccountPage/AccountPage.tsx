import React from 'react'
import { Link } from 'react-router-dom'
import { EColor, Text } from '../../components/Text'
import styles from './accountpage.css'

export function AccountPage () {
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
