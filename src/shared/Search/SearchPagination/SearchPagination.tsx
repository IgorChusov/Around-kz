import React from 'react'

import { EllipsePaginationIcon } from '../../Icons'

import styles from './searchpagination.css'

export function SearchPagination () {
  return (
    <div className={styles.container}>
      <EllipsePaginationIcon />
      <EllipsePaginationIcon />
      <EllipsePaginationIcon />
    </div>
  )
}
