import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useMounted, useToken } from '../../../hooks'
// import { MyQuestionnaires } from '../../ContainerContent/PageMenu/components/MyQuestionnaires'

import { MySchedulePage } from '../../page/MySchedulePage'
import { CreateOrderPage } from '../../page/CreateOrderPage'
import { SignInPage } from '../../page/PageRegistration/SignInPage'
import { SignUpPage } from '../../page/PageRegistration/SignUpPage'
import { AccountPage } from '../../page/AccountPage'
import { ProductPage } from '../../page/ProductPage'
import { AccountChangeProductInfoPage } from '../../page/AccountChangeProductInfoPage'
import { AccountChangeServiceInfoPage } from '../../page/AccountChangeServiceInfoPage'
import { AccountProductInfoPage } from '../../page/AccountProductInfoPage'
import { AccountSelectionServicesPage } from '../../page/AccountSelectionServicesPage'
import { AccountServiceInfoPage } from '../../page/AccountServiceInfoPage'
import { ServiceSettingSchedulePage } from '../../page/ServiceSettingSchedulePage'
import { AccountFeedbackPage } from '../../page/AccountFeedbackPage'
import { AccountInformationPage } from '../../page/AccountInformationPage'
import { SettingsMenuPage } from '../../page/SettingsMenuPage'
import { AccountMenuQuestionnairePage } from '../../page/AccountMenuQuestionnairePage'
import { AccountStartPage } from '../../page/AccountStartPage'
import { AccountChangeValuePaymentPage } from '../../page/AccountChangeValuePaymentPage/components/PageChangeValuePayment'
import { AccountMyQuestionnairesPage } from '../../page/AccountMyQuestionnairesPage'

export function AccountRoutes () {
  const [isOuth, setIsOuth] = useState(false)
  const { token } = useToken()
  const { hasMounted } = useMounted()

  useEffect(()=>{
    if(token.length === 0) {
      setIsOuth(false)
    } else {
      setIsOuth(true)
    }
  },[token])

console.log(isOuth)
  if (!hasMounted) {
    return (
      <React.Fragment />
    )
  }
  console.log(isOuth)
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
          <Route path={'/account/mySchedule'}>
            <MySchedulePage />
          </Route>
          <Route path={'/account/create-order'}>
            <CreateOrderPage />
          </Route>
          <Route path={'/account/myQuestionnaires/pageProducts/store/:id'}>
            <ProductPage />
          </Route>
          <Route path={'/account/myQuestionnaires/:typeService/:id/changePay'}>
            <AccountChangeValuePaymentPage />
          </Route>
          {/* изменение анкет */}
          <Route exact path={'/account/myQuestionnaires/service/:id/schedule'}>
            <ServiceSettingSchedulePage />
          </Route>
          <Route path={'/account/myQuestionnaires/products/:id/changeInfo'}>
              <AccountChangeProductInfoPage />
          </Route>
          <Route path={'/account/myQuestionnaires/service/:id/changeInfo'}>
            <AccountChangeServiceInfoPage />
          </Route>
          {/*  */}
          {/* <Route path={'/menu/account/business/myQuestionnaires/:typeService/:type/:id'}>
            <MenuQuestionnaire />
          </Route> */}
          <Route path={'/account/myQuestionnaires/:typeService/:id'}>
            <AccountMenuQuestionnairePage />
          </Route>
          <Route path={'/account/myQuestionnaires'}>
            <AccountMyQuestionnairesPage />
          </Route>
          {/* создание анкеты */}
          <Route path={'/account/createServices/service/'}>
            <AccountServiceInfoPage />
          </Route>
          <Route path={'/account/createServices/product'}>
            <AccountProductInfoPage />
          </Route>
          <Route path={'/account/createServices/selection/'}>
            <AccountSelectionServicesPage />
          </Route>
          {/* НАСТРОЙКИ  */}
          <Route path="/account/settings/feedback">
            <AccountFeedbackPage />
          </Route>
          <Route path="/account/settings/information">
            <AccountInformationPage />
          </Route>
          <Route path="/account/settings">
            <SettingsMenuPage />
          </Route>
          <Route path={'/account'}>
            <AccountStartPage />
          </Route>
        </Switch>
      )}
    </>
  )
}
