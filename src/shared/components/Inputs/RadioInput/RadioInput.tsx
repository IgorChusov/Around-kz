import React, { ChangeEvent } from 'react'
import styles from './radioinput.css'

interface IRadioInput {
  value: string
  selectValue: string
  valueTextLabel: string
  changeValue: (e: ChangeEvent<HTMLInputElement>) => void
}

export function RadioInput (props: IRadioInput) {
  return (
    <div className={styles.inputContent}>
      <input
        value={props.value}
        onChange={props.changeValue}
        checked={props.selectValue === props.value}
        type={'radio'}
        id={`input-location-${props.value}`}
      ></input>
      <label className={styles.label} htmlFor={`input-location-${props.value}`}>
        {props.valueTextLabel}
      </label>
    </div>
  )
}
