import React from 'react'
import { Link } from 'react-router-dom'

import styles from './buttonentry.css'

export function ButtonEntry () {
  return (
    <Link to={'/menu/entry'} className={styles.button}>
      Войти
    </Link>
  )
}
