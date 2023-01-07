import React, { useState } from 'react'
import styles from './customcheckbox.css'

interface ICustomCheckbox {
  name: string
  index: number
  defaultChecked: boolean
}

export function CustomCheckbox ({ defaultChecked, name, index }: ICustomCheckbox) {
  const [value, setValue] = useState<boolean>(defaultChecked)

  function changeHandler (event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.checked)
  }
  
  return (
    <div className={styles.checkboxContainer}>
      <input
        type="checkbox"
        defaultChecked={value}
        className={styles.input}
        id={'services-checkbox-' + index}
        name={name}
        value={name}
      />
      <label className={styles.label} htmlFor={'services-checkbox-' + index}>
        {name}
      </label>
    </div>
  )
}
