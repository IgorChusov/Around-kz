import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MePatchUserAsync } from '../../../store/me/patch/action'
import styles from './layout.css'

interface ILayoutProps {
  children?: React.ReactNode
}

export function Layout ({ children }: ILayoutProps) {
  const dispatch = useDispatch()

  return <div className={styles.container}>{children}</div>
}
