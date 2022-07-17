import React from 'react'

import { BurgerButton } from './BurgerButton'
import { FormSearchServices } from './FormSearchServices'
import styles from './search.css'

export function Search () {
  return (
    <div className={styles.content}>
      <div className={styles.formContainer}>
        <BurgerButton />
        <FormSearchServices />
      </div>
    </div>
  )
}
