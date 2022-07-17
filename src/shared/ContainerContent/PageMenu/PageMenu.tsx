import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

import { RootState } from '../../../store/reducer'
import { PageProduct } from '../PageProduct'

import { TokenState } from '../../../store/token/reduser'

import { PageStartAccount } from './components/PageStartAccount'
import { ChangeInfoProduct } from './components/ChangeInfoProduct'
import { ChangeInfoService } from './components/ChangeInfoService'
import { CreateServices } from './components/CreateServices'
import { MyQuestionnaires } from './components/MyQuestionnaires'
import { MenuQuestionnaire } from './components/MyQuestionnaires/components/MenuQuestionnaire'
import { PageChangeValuePayment } from './components/MyQuestionnaires/components/MenuQuestionnaire/components/PageChangeValuePayment'
import { MySchedulesPage } from './components/MySchedulesPage'
import { PageRegistration } from './components/PageRegistration'
import { Settings } from './components/Settings'
import { StartPage } from './components/StartPage'
import styles from './pagemenu.css'
import { PageCreateOrder } from './components/PageCreateOrder'

export function PageMenu () {
  const location = useLocation().pathname
  const history = useHistory()
  const token = useSelector<RootState, TokenState>((state) => state.token)
  // useEffect(()=>{
  //   if(location.includes('/account')){
  //     if(!token.tokenText) {
  //       history.push('/menu')
  //     }
  //   }
  // },[location])

  return (
    <Switch>
      <Route path={'/menu/registration'}>
        <PageRegistration addressNextPage="/menu/account" />
      </Route>
      <Route path={'/menu/entry'}>
        <PageRegistration addressNextPage="/menu/account" />
      </Route>
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
      <Route path={'/menu'}>
        <StartPage />
      </Route>
    </Switch>
  )
}
