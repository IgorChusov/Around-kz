import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { BurgerCloseIcon, BurgerIcon } from '../../Icons'

import styles from './burgerbutton.css'

export function BurgerButton () {
  const location = useLocation()
  return (
    <div className={styles.burger}>
      {location.pathname.includes('menu') && (
        <Link to={'/'}>
          <BurgerCloseIcon />
        </Link>
      )}
      {!location.pathname.includes('menu') && (
        <Link to={'/menu/account'}>
          <BurgerIcon />
        </Link>
      )}
    </div>
  )
}
