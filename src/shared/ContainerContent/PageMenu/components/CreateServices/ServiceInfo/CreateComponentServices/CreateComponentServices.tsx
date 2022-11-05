import React from 'react'

import { IconPan } from '../../../../../../Icons'
import { Text } from '../../../../../../components/Text'

import styles from './createcomponentservices.css'

interface ICreateComponentServices {
  nameServices: string
  componentId: string
  id: number | undefined
  handleClickOnChange: (componentId: string, id: number | undefined) => void
}

export function CreateComponentServices ({ componentId, nameServices, handleClickOnChange, id}: ICreateComponentServices) {
  return (
    <li className={styles.item}>
      <button
        className={styles.button}
        onClick={() => {
          handleClickOnChange(componentId, id)
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
