import React, { FormEvent } from 'react'

import { EColor, Text } from '../Text'

import styles from './buttonnextpage.css'

interface IButtonNextPage {
  text: string
  onClick: (e: FormEvent) => void
  classNameButton: string
}

export function ButtonNextPage ({ text, onClick, classNameButton }: IButtonNextPage) {
  return (
    <button
      onClick={(e: FormEvent) => {
        onClick(e)
      }}
      className={`${styles.button} ${classNameButton}`}
    >
      <Text color={EColor.white} size={20}>
        {text}
      </Text>
    </button>
  )
}
