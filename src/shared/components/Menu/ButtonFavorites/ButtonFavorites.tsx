import React from 'react'
import { Link } from 'react-router-dom'

import { IconFavorites } from '../../../Icons'

import styles from './buttonfavorites.css'

export function ButtonFavorites () {
  return (
    <Link to={''} className={styles.button}>
      <IconFavorites />
    </Link>
  )
}
