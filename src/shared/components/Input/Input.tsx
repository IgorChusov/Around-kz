import React, { ChangeEvent } from 'react'
import cn from 'classnames'
import styles from './input.css'

interface IInputProps {
  value: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  labelText: string
  classNameContainer?: string
  classNameInput?: string
  classNameLabel?: string
  error?: string | boolean
  inputRef?: any, 
  id: string,
  type?: string
}

export function Input (props: IInputProps) {
  const {inputRef, error, labelText, classNameLabel, classNameInput, classNameContainer, id, ...rest} = props;

  return (
    <div className={cn(styles.containerInput, classNameContainer)}>
      <input
        ref={inputRef}
        className={cn(styles.input, classNameInput, {
          [styles.inputInvalid]: !!error
        })}
        id={id}
        type="text"
        {...rest}
      />
      {error && (
        <span className={styles.error}>{error}</span>
      ) }
      <label className={cn(styles.label, classNameLabel)} htmlFor={id}>
        {labelText}
      </label>
    </div>
  )
}
