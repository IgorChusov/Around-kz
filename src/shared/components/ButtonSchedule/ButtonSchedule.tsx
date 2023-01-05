import React from 'react'
import { Link } from 'react-router-dom'
import { IconCalendar } from '../../Icons'
import styles from './buttonschedule.css'
// Вспомагательный компонент для личного кабинета(кнопки перехода к рассписанию)

interface IButtonSchedule {
  handleClick?: () => void
  path: string
  text: string
  classNameContainer?: string
  classNameLink?: string
}

export function ButtonSchedule ({ handleClick, path, text, classNameContainer, classNameLink }: IButtonSchedule) {
  return (
    <div className={`${styles.buttonContainer} ${classNameContainer}`}>
      <Link className={`${styles.link} ${classNameLink}`} onClick={handleClick} to={path}>
        {text}
      </Link>
      <div className={styles.img}>
        <IconCalendar />
      </div>
    </div>
  )
}
