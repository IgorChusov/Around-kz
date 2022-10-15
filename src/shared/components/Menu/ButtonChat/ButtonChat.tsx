import React from 'react'
import { Link } from 'react-router-dom'

import { IconChat } from '../../../Icons'
import styles from './buttonchat.css'

export function ButtonChat () {
  return (
    <Link to={''} className={styles.button}>
      <IconChat />
    </Link>
  )
}
