import React, { ChangeEvent } from 'react'
import cn from 'classnames'

import styles from './input.css'

interface IInputProps {
  value: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  idInput: string
  labelText: string
  classNameContainer?: string
  classNameInput?: string
  classNameLabel?: string
  error?: string
}

export function Input (props: IInputProps) {
  return (
    <div className={`${styles.containerInput} ${props.classNameContainer ? props.classNameContainer : ''}`}>
      <input
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
        className={cn(styles.input, props.classNameInput, {
          [styles.inputInvalid] : props.error?.length && props.error?.length > 0
        })}
        id={props.idInput}
        type="text"
      />
      {props.error && (
        <span className={styles.error}>{props.error}</span>
      ) }
      <label className={`${styles.label} ${props.classNameLabel ? props.classNameLabel : ''}`} htmlFor={props.idInput}>
        {props.labelText}
      </label>
    </div>
  )
}
