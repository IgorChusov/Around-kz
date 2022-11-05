import React, { useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

import { useToken } from '../../hooks/useToken'

import styles from './routes.css'
import { useDispatch, useSelector } from 'react-redux'
import { MeGetUserAsync } from '../../store/me/get/action'
import { RootState } from '../../store/reducer'
import { MeGetState } from '../../store/me/get/reduser'
import { Loading } from '../components/Loading'
import { RefreshTokenAsync, tokenRequestSuccess } from '../../store/token/action'
import { ButtonCloseContent } from '../components/ButtonCloseContent'
import { MenuRoutes } from './MenuRoutes'
import { ProductRoutes } from './ProductRoutes/ProductRoutes'
import { ServiceRotes } from './ServiceRoutes'

export function Routes () {
  const location = useLocation()
  const history = useHistory()
  const me = useSelector<RootState, MeGetState>((state) => state.me)
  const token = useToken()
  const dispatch = useDispatch()
  
  useEffect(()=> {
    if(token.tokenLocalStorage && token.token.length === 0) {
      dispatch(RefreshTokenAsync())
    }
  }, [token.tokenLocalStorage])

  const loadMe = async () => {
    const me = await dispatch(MeGetUserAsync(token.token))
    if(!me) {
      localStorage.removeItem('token')
      dispatch(tokenRequestSuccess(''))
      history.push('/')
    }
  }
  
  useEffect(()=>{
    if(token.token.length !== 0) {
      loadMe()
    }
  }, 
  [token.token])

  return (
    <div className={styles.content}>
      {(me.loading && location.pathname.includes('menu')) && (
        <div className={styles.loading}>
          <Loading loading={me.loading}/>
        </div>
      )}
      {(!me.loading) && (
        <>
          <>
            <Switch>
              <Route path={'/pageProducts/:type/:id'}>
                <ProductRoutes />
              </Route>
              <Route path={'/pageService/:id'}>
                <ServiceRotes />
              </Route>
              <Route path={'/menu'}>
                <MenuRoutes />
              </Route>
            </Switch>
          </>
          <ButtonCloseContent />
        </>
      )}
    </div>
  )
}
