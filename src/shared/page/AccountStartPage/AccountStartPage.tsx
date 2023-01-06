import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { TAccountState } from '../../../store/account/reducer'
import { RootState } from '../../../store/reducer'
import { ButtonAccount } from '../../components/Buttons/ButtonAccount'
import { ButtonSchedule } from '../../components/Buttons/ButtonSchedule'
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
        <Redirect from="/account" to="/account/personal" />
        <Switch>
          <Route path="/account/personal">
            <div className={styles.buttonGroup}>
              <ButtonAccount
                classNameContainer={styles.buttonAccount}
                path="/account/create-order/basic-info"
                text="Создать новый заказ"
              />
              <ButtonSchedule path="/account/mySchedule" text="Мои записи и заказы" />
            </div>
          </Route>
          <Route path="/account/business">
            <div className={styles.buttonGroup}>
              <ButtonAccount
                classNameContainer={styles.buttonAccount}
                path="/account/myQuestionnaires"
                text="Мои анкеты"
              />
              <ButtonSchedule path="/account/mySchedule" text="Мои записи и заказы" />
            </div>
          </Route>
        </Switch>
        <Menu />
      </div>
    </div>
  )
}
