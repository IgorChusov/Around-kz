import React, { useEffect, useState } from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'
import { useToken } from '../../../hooks'

import { MyQuestionnaires } from '../../ContainerContent/PageMenu/components/MyQuestionnaires'

import { PageChangeValuePayment } from '../../ContainerContent/PageMenu/components/MyQuestionnaires/components/MenuQuestionnaire/components/PageChangeValuePayment'
import { MySchedulePage } from '../../page/MySchedulePage'
import { CreateOrderPage } from '../../page/CreateOrderPage'
import { SignInPage } from '../../page/PageRegistration/SignInPage'
import { SignUpPage } from '../../page/PageRegistration/SignUpPage'
import { PageStartAccount } from '../../ContainerContent/PageMenu/components/PageStartAccount'

import { AccountPage } from '../../page/AccountPage'
import { ProductPage } from '../../page/ProductPage'
import { ChangeInfoProductPage } from '../../page/ChangeInfoProductPage'
import { ChangeInfoServicePage } from '../../page/ChangeInfoServicePage'
import { ProductInfoPage } from '../../page/ProductInfoPage'
import { SelectionServicesPage } from '../../page/SelectionServicesPage'
import { ServiceInfoPage } from '../../page/ServiceInfoPage'
import { ServiceSettingSchedulePage } from '../../page/ServiceSettingSchedulePage'

import { FeedbackPage } from '../../page/FeedbackPage'
import { InformationAccountPage } from '../../page/InformationAccountPage'
import { SettingsMenuPage } from '../../page/SettingsMenuPage'
import { MenuQuestionnairePage } from '../../page/MenuQuestionnairePage'


export function MenuRoutes () {
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
            <SignUpPage />
           </Route>
          <Route path={'/menu/sign-in'}>
            <SignInPage />
          </Route>
          <Route exact path={'/menu/account'}>
            <AccountPage />
          </Route>
          {/* <Redirect from={'/menu/account/*'} to={'/menu/account/'} /> */}
        </Switch>
      )}
      {isOuth && (
        <Switch>
          <Route path={'/menu/account/mySchedule'}>
            <MySchedulePage />
          </Route>
          <Route path={'/menu/account/create-order'}>
            <CreateOrderPage />
          </Route>
          <Route path={'/menu/account/business/myQuestionnaires/pageProducts/store/:id'}>
            <ProductPage />
          </Route>
          <Route path={'/menu/account/business/myQuestionnaires/:typeService/:id/changePay'}>
            <PageChangeValuePayment />
          </Route>
          {/* изменение анкет */}
          <Route exact path={'/menu/account/business/myQuestionnaires/service/:id/schedule'}>
            <ServiceSettingSchedulePage />
          </Route>
          <Route path={'/menu/account/business/myQuestionnaires/products/:id/changeInfo'}>
              <ChangeInfoProductPage />
          </Route>
          <Route path={'/menu/account/business/myQuestionnaires/service/:id/changeInfo'}>
            <ChangeInfoServicePage />
          </Route>
          {/*  */}
          {/* <Route path={'/menu/account/business/myQuestionnaires/:typeService/:type/:id'}>
            <MenuQuestionnaire />
          </Route> */}
          <Route path={'/menu/account/business/myQuestionnaires/:typeService/:id'}>
            <MenuQuestionnairePage />
          </Route>
          <Route path={'/menu/account/business/myQuestionnaires'}>
            <MyQuestionnaires />
          </Route>
          {/* создание анкеты */}

          <Route path={'/menu/account/business/createServices/service/'}>
            <ServiceInfoPage />
          </Route>
          <Route path={'/menu/account/business/createServices/buy'}>
            {/* <BuyInfo /> */}
            <ProductInfoPage />
          </Route>
          <Route path={'/menu/account/business/createServices/selection/'}>
            <SelectionServicesPage />
          </Route>
          {/* НАСТРОЙКИ  */}
          <Route path="/menu/account/settings/feedback">
            <FeedbackPage />
          </Route>
          <Route path="/menu/account/settings/information">
            <InformationAccountPage />
          </Route>
          <Route path="/menu/account/settings">
            <SettingsMenuPage />
          </Route>

          <Route path={'/menu/account'}>
            <PageStartAccount />
          </Route>
          <Redirect exact from='/menu/sign-up' to='/menu/account/personal' />
          <Redirect exact from='/menu/sign-in' to='/menu/account/personal' />
        </Switch>
      )}
    </>
  )
}
