import React from 'react'
import { Link } from 'react-router-dom'

import { CloseContentIcon } from '../../Icons'

import styles from './buttonclosecontent.css'
interface IButtonCloseContent {
  onClick?: () => void
}
export function ButtonCloseContent ({ onClick }: IButtonCloseContent) {
  return (
    <Link to={'/'} onClick={onClick} className={styles.button}>
      <CloseContentIcon />
    </Link>
  )
}
