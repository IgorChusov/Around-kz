import React from 'react'

import { ButtonChat } from './ButtonChat'
import { ButtonFavorites } from './ButtonFavorites'
import { ButtonNotice } from './ButtonNotice'
import { ButtonSettings } from './ButtonSettings'
import styles from './menu.css'

export function Menu () {
  return (
    <div className={styles.buttonGroup}>
      <ButtonFavorites />
      <ButtonNotice />
      <ButtonChat />
      <ButtonSettings />
    </div>
  )
}
