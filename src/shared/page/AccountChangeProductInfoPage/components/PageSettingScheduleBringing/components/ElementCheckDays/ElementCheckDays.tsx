import React from 'react'

import styles from './elementcheckdays.css'

interface IElementCheckDays {
  classNameForm?: string
  // строка для добавления к Id  для его отличия от других
  warningStringOnIdChangeElement: string
  dataDays: { name: string; checked: boolean; disabled: boolean }[]
  handleChange: (index: number) => void
}

export function ElementCheckDays (props: IElementCheckDays) {
  return (
    <form className={`${styles.form} ${props.classNameForm}`}>
      <ul className={styles.list}>
        {props.dataDays.map((elem, index) => {
          return (
            <li key={elem.name} className={styles.item}>
              <input
                disabled={elem.disabled}
                onChange={() => {
                  props.handleChange(index)
                }}
                checked={elem.checked}
                className={styles.input}
                id={`input-check-${elem.name}-${props.warningStringOnIdChangeElement}`}
                type="radio"
              />
              <label
                className={styles.label}
                htmlFor={`input-check-${elem.name}-${props.warningStringOnIdChangeElement}`}
              >
                {elem.name}
              </label>
            </li>
          )
        })}
      </ul>
    </form>
  )
}
