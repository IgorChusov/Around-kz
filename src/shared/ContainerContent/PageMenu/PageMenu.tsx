import React, { useEffect, useState } from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import { PageProduct } from '../PageProduct'

import { PageStartAccount } from './components/PageStartAccount'
import { ChangeInfoProduct } from './components/ChangeInfoProduct'
import { ChangeInfoService } from './components/ChangeInfoService'
import { CreateServices } from './components/CreateServices'
import { MyQuestionnaires } from './components/MyQuestionnaires'
import { MenuQuestionnaire } from './components/MyQuestionnaires/components/MenuQuestionnaire'
import { PageChangeValuePayment } from './components/MyQuestionnaires/components/MenuQuestionnaire/components/PageChangeValuePayment'
import { MySchedulesPage } from './components/MySchedulesPage'

import { Settings } from './components/Settings'
import { StartPage } from './components/StartPage'
import { PageCreateOrder } from './components/PageCreateOrder'
import { SignUp } from './components/PageRegistration/SignUp'
import { SignIn } from './components/PageRegistration/SignIn'
import { useToken } from '../../../hooks/useToken'

export function PageMenu () {
  const [isOuth, setIsOuth] = useState(false)
  const tokenHook = useToken()

  useEffect(()=>{
    if(tokenHook.token.length === 0) {
      setIsOuth(false)
    } else {
      setIsOuth(true)
    }
  },[ tokenHook.token])

  return (
    <>
      {!isOuth && (
        <Switch>
          <Route path={'/menu/sign-up'}>
            <SignUp />
           </Route>
          <Route path={'/menu/sign-in'}>
            <SignIn />
          </Route>
          <Route exact path={'/menu/account'}>
            <StartPage />
          </Route>
        </Switch>
      )}
      {isOuth && (
        <Switch>
          <Route path={'/menu/account/mySchedule'}>
            <MySchedulesPage />
          </Route>
          <Route path={'/menu/account/create-order'}>
            <PageCreateOrder />
          </Route>
          <Route path={'/menu/account/business/myQuestionnaires/pageProducts/store/:id'}>
            <PageProduct />
          </Route>
          <Route path={'/menu/account/business/myQuestionnaires/:typeService/:type/:id/changePay'}>
            <PageChangeValuePayment />
          </Route>
          <Route path={'/menu/account/business/myQuestionnaires/products/:type/:id/changeInfo'}>
            <ChangeInfoProduct />
          </Route>
          <Route path={'/menu/account/business/myQuestionnaires/service/:id/changeInfo'}>
            <ChangeInfoService />
          </Route>
          <Route path={'/menu/account/business/myQuestionnaires/:typeService/:type/:id'}>
            <MenuQuestionnaire />
          </Route>
          <Route path={'/menu/account/business/myQuestionnaires/:typeService/:id'}>
            <MenuQuestionnaire />
          </Route>
          <Route path={'/menu/account/business/myQuestionnaires'}>
            <MyQuestionnaires />
          </Route>
          <Route path={'/menu/account/business/createServices/selection/'}>
            <CreateServices />
          </Route>
          <Route path={'/menu/account/settings'}>
            <Settings />
          </Route>
          <Route path={'/menu/account'}>
            <PageStartAccount />
          </Route>
          <Redirect exact from='/menu/sign-up' to='/menu/account' />
          <Redirect exact from='/menu/sign-in' to='/menu/account' />
        </Switch>
      )}
    </>
  )
}
