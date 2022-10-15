import React from 'react'

import styles from './dualcheckbox.css'

export type TDualCheckboxValue = {
  value: string
  textLabel: string
  checked: boolean
}
interface IDualCheckbox {
  // firstValue: string;
  // firstTextLabel: string;
  // secondTextLabel:string;
  // secondValue: string;
  // selectValue: {firstCheckBox: boolean, secondCheckbox: boolean}
  changeValue: (index: number) => void
  classNameForm?: string
  listCheckbox: { value: string; textLabel: string; checked: boolean }[]
}
export function DualCheckbox (props: IDualCheckbox) {
  return (
    <form className={`${styles.form} ${props.classNameForm}`} action="">
      {props.listCheckbox.map((elem, index) => {
        return (
          <div key={elem.value} className={styles.inputContent}>
            <input
              value={elem.value}
              onChange={() => {
                props.changeValue(index)
              }}
              checked={elem.checked}
              type={'checkbox'}
              id={`input-location-${index}`}
            ></input>
            <label className={styles.label} htmlFor={`input-location-${index}`}>
              {elem.textLabel}
            </label>
          </div>
        )
      })}
      {/* <div className={styles.inputContent}>
      <input value={props.firstValue} onChange={props.changeValue} checked={props.selectValue === props.firstValue ? true : false} type={'radio'} id={`input-location-${props.firstValue}`}></input>
      <label className={styles.label} htmlFor={`input-location-${props.firstValue}`}>{props.firstTextLabel}</label>
    </div>
    <div className={styles.inputContent}>
      <input value={props.secondValue} onChange={props.changeValue} checked={props.selectValue === props.secondValue ? true : false}  type={'radio'} id={`input-location-${props.secondValue}`}></input>
      <label className={styles.label} htmlFor={`input-location-${props.secondValue}`}>{props.secondTextLabel}</label>
    </div> */}
    </form>
  )
}
