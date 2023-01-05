import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Text } from '../../Text'
import styles from './changeaccount.css'

export function ChangeAccountButtonGroup () {
  const location = useLocation().pathname
  useEffect(() => {
    if (location === '/menu/account/personal') {
      document.getElementById('business-button')?.classList.remove(`${styles.buttonActive}`)
      document.getElementById('personal-button')?.classList.add(`${styles.buttonActive}`)
    }
    if (location === '/menu/account/business') {
      document.getElementById('personal-button')?.classList.remove(`${styles.buttonActive}`)
      document.getElementById('business-button')?.classList.add(`${styles.buttonActive}`)
    }
  }, [location])

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <Link to={'/menu/account/personal'} id="personal-button" className={`${styles.button} ${styles.buttonActive}`}>
          Личный
        </Link>
        <Link to="/menu/account/business" id="business-button" className={styles.button}>
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
