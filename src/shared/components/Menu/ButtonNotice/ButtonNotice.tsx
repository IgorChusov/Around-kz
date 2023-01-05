import React from 'react'
import { Link } from 'react-router-dom'
import { IconNotice } from '../../../Icons'
import styles from './buttonnotice.css'

export function ButtonNotice () {
  return (
    <Link to={''} className={styles.button}>
      <IconNotice />
    </Link>
  )
}
