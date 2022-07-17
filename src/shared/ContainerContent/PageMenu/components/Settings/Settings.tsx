import React from 'react'
import { Route, Switch } from 'react-router'

import { SettingsMenu } from './components/SettingsMenu'
import styles from './settings.css'

export function Settings () {
  return (
    <div className={styles.container}>
      <Switch>
        <Route path="/menu/account/settings">
          <SettingsMenu />
        </Route>
      </Switch>
    </div>
  )
}
