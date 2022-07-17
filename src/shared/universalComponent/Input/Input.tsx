import React, { ChangeEvent } from 'react'

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
}

export function Input (props: IInputProps) {
  return (
    <div className={`${styles.containerInput} ${props.classNameContainer ? props.classNameContainer : ''}`}>
      <input
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
        className={`${styles.input} ${props.classNameInput ? props.classNameInput : ''}`}
        id={props.idInput}
        type="text"
      />
      <label className={`${styles.label} ${props.classNameLabel ? props.classNameLabel : ''}`} htmlFor={props.idInput}>
        {props.labelText}
      </label>
    </div>
  )
}
