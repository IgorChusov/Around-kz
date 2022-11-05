import React from 'react'
import { Link } from 'react-router-dom'

import styles from './buttonaccount.css'
// Вспомагательный компонент для личного кабинета(кнопки создания заказов/анкет)

interface IButtonAccount {
  handleClick?: () => void
  path: string
  text: string
  classNameContainer?: string
  classNameLink?: string
}

export function ButtonAccount ({ handleClick, path, text, classNameContainer, classNameLink }: IButtonAccount) {
  return (
    <div className={`${styles.button} ${classNameContainer}`}>
      <Link className={`${styles.link} ${classNameLink}`} onClick={handleClick} to={path}>
        {text}
      </Link>
    </div>
  )
}
