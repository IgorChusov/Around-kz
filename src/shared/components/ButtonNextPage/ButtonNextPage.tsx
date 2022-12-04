import classnames from 'classnames'
import React, { FormEvent } from 'react'

import { EColor, Text } from '../Text'

import styles from './buttonnextpage.css'

interface IButtonNextPage {
  text: string
  onClick?: (e: FormEvent) => void
  classNameButton: string
  isTransparentBackground?: boolean
}

export function ButtonNextPage ({ text, onClick, classNameButton, isTransparentBackground }: IButtonNextPage) {
  return (
    <button
      onClick={onClick}
      className={classnames(styles.button, classNameButton, {
        [styles.backTransparent] : isTransparentBackground
      })}
    >
      <Text color={EColor.white} size={20}>
        {text}
      </Text>
    </button>
  )
}
