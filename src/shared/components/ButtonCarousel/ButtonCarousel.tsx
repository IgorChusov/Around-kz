import React from 'react'

import { IconMinus, IconPlus } from '../../Icons'
import { Text, EColor } from '../Text'

import styles from './buttoncarousel.css'

interface IButtonCarousel {
  amount: number
  onPlus: () => void
  onMinus: () => void
  classNameGroup?: string
}

export function ButtonCarousel (props: IButtonCarousel) {
  return (
    <div className={`${styles.buttonGroup} ${props.classNameGroup}`}>
      <button disabled={props.amount === 0} onClick={props.onMinus} className={styles.button}>
        <IconMinus />
      </button>
      <Text color={EColor.greenLight} size={16}>
        {props.amount}
      </Text>
      <button onClick={props.onPlus} className={styles.button}>
        <IconPlus />
      </button>
    </div>
  )
}
