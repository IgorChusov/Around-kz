import React from 'react'

import { IconPan } from '../../../../../../Icons'
import { Text } from '../../../../../../universalComponent/Text'

import styles from './createcomponentservices.css'

interface ICreateComponentServices {
  nameServices: string
  componentId: string
  handleClickOnChange: (componentId: string) => void
}

export function CreateComponentServices ({ componentId, nameServices, handleClickOnChange }: ICreateComponentServices) {
  return (
    <li className={styles.item}>
      <button
        className={styles.button}
        onClick={() => {
          handleClickOnChange(componentId)
        }}
      >
        <Text As="p" size={16}>
          {nameServices}
        </Text>
        <IconPan />
      </button>
    </li>
  )
}
