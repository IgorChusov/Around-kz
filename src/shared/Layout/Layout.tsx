import axios from 'axios'
import React, { useEffect } from 'react'

import EnvConfig from '../../config/env'

import styles from './layout.css'

interface ILayoutProps {
  children?: React.ReactNode
}

export function Layout ({ children }: ILayoutProps) {
  useEffect(() => {
    axios
      .get('http://localhost:8000/users/businessmen/')
      .then((resp) => {
        console.log('ответ сервера', resp)
      })
      .catch((error) => {
        console.log('ошибка', error)
      })
  }, [])
  console.log(EnvConfig.apiUrl)
  return <div className={styles.container}>{children}</div>
}
