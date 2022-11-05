import React from 'react'
import { Link } from 'react-router-dom'

import { IconSetting } from '../../../Icons'

import styles from './buttonsettings.css'

export function ButtonSettings () {
  return (
    <Link to={'/menu/account/settings'} className={styles.button}>
      <IconSetting />
    </Link>
  )
}
