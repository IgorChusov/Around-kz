import React from 'react'
import { Route, Switch } from 'react-router'

import { BuyInfo } from './BuyInfo'
import { SelectionServices } from './SelectionServices'
import { ServiceInfo } from './ServiceInfo'

import styles from './createservices.css'

export function CreateServices () {
  return (
    <>
      <Switch>
        <Route path={'/menu/account/business/createServices/selection/service/'}>
          <ServiceInfo />
        </Route>
        <Route path={'/menu/account/business/createServices/selection/buy'}>
          <BuyInfo />
        </Route>
        <Route path={'/menu/account/business/createServices/selection'}>
          <SelectionServices />
        </Route>
      </Switch>
    </>
  )
}
