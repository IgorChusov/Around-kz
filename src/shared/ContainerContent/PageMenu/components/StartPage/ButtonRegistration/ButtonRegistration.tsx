import React from 'react'
import { Link } from 'react-router-dom'

import styles from './buttonregistration.css'

export function ButtonRegistration () {
  return (
    <Link to={'/menu/registration'} className={styles.button}>
      Зарегистрироваться
    </Link>
  )
}
