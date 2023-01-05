import React from 'react'
import styles from './errorpanel.css'

export interface IErrorPanel {
  name: string
  text: string
  valid: boolean
}

export function ErrorPanel ({ list }: { list: IErrorPanel[] }) {
  return (
    <ul className={styles.list}>
      {list.map((elem) => {
        return !elem.valid ? <li className={styles.item} key={elem.name}>{`* ${elem.text}`}</li> : null
      })}
    </ul>
  )
}
