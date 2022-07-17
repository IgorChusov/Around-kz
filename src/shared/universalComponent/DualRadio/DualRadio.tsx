import React from 'react'

import { Text } from '../Text'

import styles from './dualradio.css'

interface IDualRadio {
  firstValue: string
  firstTextLabel: string
  secondTextLabel: string
  secondValue: string
  selectValue: string
  changeValue: (event: any) => void
  classNameForm?: string
  descriptionFirst?: string
  descriptionSecond?: string
}

export function DualRadio (props: IDualRadio) {
  return (
    <form className={`${styles.form} ${props.classNameForm}`} action="">
      <div className={styles.container}>
        <div className={styles.inputContent}>
          <input
            value={props.firstValue}
            onChange={props.changeValue}
            checked={props.selectValue === props.firstValue}
            type={'radio'}
            id={`input-location-${props.firstValue}`}
          ></input>
          <label className={styles.label} htmlFor={`input-location-${props.firstValue}`}>
            {props.firstTextLabel}
          </label>
        </div>
        {props.descriptionFirst && (
          <Text className={styles.text} As="p" size={12}>
            {props.descriptionFirst}
          </Text>
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.inputContent}>
          <input
            value={props.secondValue}
            onChange={props.changeValue}
            checked={props.selectValue === props.secondValue}
            type={'radio'}
            id={`input-location-${props.secondValue}`}
          ></input>
          <label className={styles.label} htmlFor={`input-location-${props.secondValue}`}>
            {props.secondTextLabel}
          </label>
        </div>
        {props.descriptionSecond && (
          <Text className={styles.text} As="p" size={12}>
            {props.descriptionSecond}
          </Text>
        )}
      </div>
    </form>
  )
}
