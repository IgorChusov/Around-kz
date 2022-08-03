import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { LoginUserAsync } from '../../store/token/action'

import styles from './layout.css'

interface ILayoutProps {
  children?: React.ReactNode
}

export function Layout ({ children }: ILayoutProps) {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(LoginUserAsync('+79315432195'))
  }, [])
  return <div className={styles.container}>{children}</div>
}
