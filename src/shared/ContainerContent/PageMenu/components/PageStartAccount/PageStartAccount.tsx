import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, useHistory } from 'react-router-dom'

import { RootState } from '../../../../../store/reducer'
import { ButtonAccount } from '../../../../universalComponent/ButtonAccount'
import { ButtonSchedule } from '../../../../universalComponent/ButtonSchedule'
import { Menu } from '../../../../Menu'

import styles from './pagestartaccount.css'
import { ChangeAccount } from './ChangeAccount'
import { MeGetState } from '../../../../../store/me/get/reduser'

export function PageStartAccount () {
  const me = useSelector<RootState, MeGetState>((state) => state.me)
  const history = useHistory()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{`Добро пожаловать, ${me.data.username}`}</h2>
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
