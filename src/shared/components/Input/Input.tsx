import React, { ChangeEvent } from 'react'
import cn from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import styles from './input.css'

interface IInputProps {
  value: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  labelText: string
  classNameContainer?: string
  classNameInput?: string
  classNameLabel?: string
  error?: string
  inputRef?: any
}

export function Input (props: IInputProps) {
  const idInput = uuidv4();
  return (
    <div className={cn(styles.containerInput, props.classNameContainer)}>
      <input
        ref={props.inputRef}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
        className={cn(styles.input, props.classNameInput, {
          [styles.inputInvalid] : props.error?.length && props.error?.length > 0
        })}
        id={idInput}
        type="text"
      />
      {props.error && (
        <span className={styles.error}>{props.error}</span>
      ) }
      <label className={cn(styles.label, props.classNameLabel)} htmlFor={idInput}>
        {props.labelText}
      </label>
    </div>
  )
}
