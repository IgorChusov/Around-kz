import React from 'react'
import { Link } from 'react-router-dom'
import { IconArrowBack } from '../../Icons'
import { EColor, Text } from '../Text'
import styles from './buttonback.css'

interface IButtonBack {
  handleClick?: () => void
  className?: string
  addressLink?: string
}

export function ButtonBack ({ addressLink, handleClick, className }: IButtonBack) {
  return (
    <div className={`${styles.position}  ${className}`}>
      {!addressLink && (
        <button className={`${styles.btn}`} onClick={handleClick}>
          <IconArrowBack />
          <Text color={EColor.greenLight} className={styles.text} size={16}>
            Назад
          </Text>
        </button>
      )}
      {addressLink && (
        <Link onClick={handleClick} className={`${styles.btn} ${className}`} to={addressLink}>
          <IconArrowBack />
          <Text color={EColor.greenLight} className={styles.text} size={16}>
            Назад
          </Text>
        </Link>
      )}
    </div>
  )
}
