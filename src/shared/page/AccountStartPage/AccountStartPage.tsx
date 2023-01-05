import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { TAccountState } from '../../../store/account/reducer'
import { RootState } from '../../../store/reducer'
import { ButtonAccount } from '../../components/ButtonAccount'
import { ButtonSchedule } from '../../components/ButtonSchedule'
import { Menu } from '../../components/Menu'
import { ChangeAccountButtonGroup } from '../../components/Buttons/ChangeAccountButtonGroup'
import styles from './pagestartaccount.css'

export function AccountStartPage () {
  const { user } = useSelector<RootState, TAccountState>((state) => state.account)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{`Добро пожаловать, ${user.data.username}`}</h2>
        <div className={styles.containerChange}>
          <ChangeAccountButtonGroup />
        </div>
        <Redirect from="/menu/account" to="/menu/account/personal" />
        <Switch>
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
        </Switch>
      </div>
    </div>
  )
}
