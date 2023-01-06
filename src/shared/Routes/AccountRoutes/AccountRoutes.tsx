import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useToken } from '../../../hooks'
import { MyQuestionnaires } from '../../ContainerContent/PageMenu/components/MyQuestionnaires'
import { PageChangeValuePayment } from '../../ContainerContent/PageMenu/components/MyQuestionnaires/components/MenuQuestionnaire/components/PageChangeValuePayment'
import { MySchedulePage } from '../../page/MySchedulePage'
import { CreateOrderPage } from '../../page/CreateOrderPage'
import { SignInPage } from '../../page/PageRegistration/SignInPage'
import { SignUpPage } from '../../page/PageRegistration/SignUpPage'
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
import { AccountStartPage } from '../../page/AccountStartPage'

export function AccountRoutes () {
  const [isOuth, setIsOuth] = useState(false)
  const { token } = useToken()

  useEffect(()=>{
    if(token.length === 0) {
      setIsOuth(false)
    } else {
      setIsOuth(true)
    }
  },[token])

  return (
    <>
      {/* is not autorization */}
      {!isOuth && (
        <Switch>     
          <Route path={'/account/sign-up'}>
            <SignUpPage />
           </Route>
          <Route path={'/account/sign-in'}>
            <SignInPage />
          </Route>
          <Route exact path={'/account'}>
            <AccountPage />
          </Route>
          {/* <Redirect from={'/menu/account/*'} to={'/menu/account/'} /> */}
        </Switch>
      )}
      {/* is autorization */}
      {isOuth && (
        <Switch>
          <Route path={'/menu/account/mySchedule'}>
            <MySchedulePage />
          </Route>
          <Route path={'/menu/account/create-order'}>
            <CreateOrderPage />
          </Route>
          <Route path={'/menu/account/myQuestionnaires/pageProducts/store/:id'}>
            <ProductPage />
          </Route>
          <Route path={'/menu/account/myQuestionnaires/:typeService/:id/changePay'}>
            <PageChangeValuePayment />
          </Route>
          {/* изменение анкет */}
          <Route exact path={'/menu/account/myQuestionnaires/service/:id/schedule'}>
            <ServiceSettingSchedulePage />
          </Route>
          <Route path={'/menu/account/myQuestionnaires/products/:id/changeInfo'}>
              <ChangeInfoProductPage />
          </Route>
          <Route path={'/menu/account/myQuestionnaires/service/:id/changeInfo'}>
            <ChangeInfoServicePage />
          </Route>
          {/*  */}
          {/* <Route path={'/menu/account/business/myQuestionnaires/:typeService/:type/:id'}>
            <MenuQuestionnaire />
          </Route> */}
          <Route path={'/menu/account/myQuestionnaires/:typeService/:id'}>
            <MenuQuestionnairePage />
          </Route>
          <Route path={'/menu/account/myQuestionnaires'}>
            <MyQuestionnaires />
          </Route>
          {/* создание анкеты */}

          <Route path={'/menu/account/createServices/service/'}>
            <ServiceInfoPage />
          </Route>
          <Route path={'/menu/account/createServices/buy'}>
            {/* <BuyInfo /> */}
            <ProductInfoPage />
          </Route>
          <Route path={'/menu/account/createServices/selection/'}>
            <SelectionServicesPage />
          </Route>
          {/* НАСТРОЙКИ  */}
          <Route path="/menu/account/settings/feedback">
            <FeedbackPage />
          </Route>
          <Route path="/menu/account/settings/information">
            <InformationAccountPage />
          </Route>
          <Route path="/account/settings">
            <SettingsMenuPage />
          </Route>
          <Route path={'/account'}>
            <AccountStartPage />
          </Route>
          <Redirect exact from='/menu/sign-up' to='/menu/account/personal' />
          <Redirect exact from='/menu/sign-in' to='/menu/account/personal' />
        </Switch>
      )}
    </>
  )
}
