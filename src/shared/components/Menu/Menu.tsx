import React from 'react'
import { Link } from 'react-router-dom'
import { IconChat, IconFavorites, IconNotice, IconSetting } from '../../Icons'
import styles from './menu.css'

export function Menu () {
  return (
    <div className={styles.buttonGroup}>
      <Link to="/account/favorites" className={styles.button}>
        <IconFavorites />
      </Link>
      <Link to="/account/notice" className={styles.button}>
        <IconNotice />
      </Link>
      <Link to="/account/chat" className={styles.button}>
        <IconChat />
      </Link>
      <Link to="/account/settings" className={styles.button}>
        <IconSetting />
      </Link>
    </div>
  )
}
