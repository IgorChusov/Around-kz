import React from 'react'
import styles from './dualcheckbox.css'

export type TDualCheckboxValue = {
  value: string
  textLabel: string
  checked: boolean
}

interface IDualCheckbox {
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
    </form>
  )
}
