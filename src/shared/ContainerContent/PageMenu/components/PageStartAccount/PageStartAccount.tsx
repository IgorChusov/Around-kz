import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, useHistory } from 'react-router-dom'

import { RootState } from '../../../../../store/reducer'
import { ButtonAccount } from '../../../../universalComponent/ButtonAccount'
import { ButtonSchedule } from '../../../../universalComponent/ButtonSchedule'
import { Menu } from '../../../../Menu'

import styles from './pagestartaccount.css'
import { ChangeAccount } from './ChangeAccount'

export function PageStartAccount () {
  const token = useSelector<RootState, string>((state) => state.token.tokenText)
  const history = useHistory()
  // useEffect(()=>{
  //   const localStorageToken = localStorage.getItem('TOKEN')
  //   if(!token && !localStorageToken) {
  //     history.push('/')
  //   }
  // }, [])
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Добро пожаловать, Алькей</h2>
        <div className={styles.containerChange}>
          <ChangeAccount />
        </div>
        <Redirect from="/menu/account" to="/menu/account/personal" />
        <Route path="/menu/account/personal">
          <div className={styles.buttonGroup}>
            <ButtonAccount
              classNameContainer={styles.buttonAccount}
              path="/menu/account/create-order/basic-info"
              text="Создать новый заказ"
            />
            <ButtonSchedule path="/menu/account/mySchedule" text="Мои записи и заказы" />
          </div>
          <Menu />
        </Route>
        <Route path="/menu/account/business">
          <div className={styles.buttonGroup}>
            <ButtonAccount
              classNameContainer={styles.buttonAccount}
              path="/menu/account/business/myQuestionnaires"
              text="Мои анкеты"
            />
            <ButtonSchedule path="/menu/account/mySchedule" text="Мои записи и заказы" />
          </div>
          <Menu />
        </Route>
      </div>
    </div>
  )
}
