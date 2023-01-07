import React from 'react'
import { Link } from 'react-router-dom'
import styles from './linknextpage.css'

interface ILinkNextPage {
  text: string
  addressPage: string
}

export function LinkNextPage ({ text, addressPage }: ILinkNextPage) {
  return (
    <Link className={styles.button} to={addressPage}>
      {text}
    </Link>
  )
}
