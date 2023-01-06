import React from 'react'
import classnames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { Text } from '../../Text'
import styles from './changeaccount.css'

export function ChangeAccountButtonGroup () {
  const location = useLocation().pathname

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Link to={'/account/personal'} id="personal-button" className={classnames(styles.button, {
          [styles.buttonActive]: location === '/account/personal'
        })}>
          Личный
        </Link>
        <Link to="/account/business" id="business-button" className={classnames(styles.button, {
          [styles.buttonActive]: location === '/account/business'
        })}>
          Бизнес
        </Link>
        <div className={styles.presentation}></div>
      </div>
      <Text As="p" className={styles.info} size={12}>
        Сменить тип аккаунта
      </Text>
    </div>
  )
}
