import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { useToken } from '../../hooks'
import { RootState } from '../../store/reducer'
import { Loading } from '../components/Loading'
// import { RefreshTokenAsync, tokenRequestSuccess } from '../../store/token/action'
import { ButtonCloseContent } from '../components/Buttons/ButtonCloseContent'
import { AccountRoutes } from './AccountRoutes'
import { ProductRoutes } from './ProductRoutes/ProductRoutes'
import { ServiceRoutes } from './ServiceRoutes'
import { TAccountState } from '../../store/account/reducer'
import { AccountMeGetUserAsync } from '../../store/account/action'
import { RefreshTokenAsync, tokenRequestSuccess } from '../../store/session/action'
import styles from './routes.css'

export function Routes () {
  const location = useLocation()
  const history = useHistory()
  const { user } = useSelector<RootState, TAccountState>((state) => state.account)
  const token = useToken()
  const dispatch = useDispatch()
  
  useEffect(()=> {
    if(token.tokenLocalStorage && token.token.length === 0) {
      dispatch(RefreshTokenAsync())
    }
  }, [token.tokenLocalStorage])

  const loadMe = async () => {
    const me = await dispatch(AccountMeGetUserAsync(token.token))
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
      {(user.loading && location.pathname.includes('account')) && (
        <div className={styles.loading}>
          <Loading loading={user.loading}/>
        </div>
      )}
      {(!user.loading) && (
        <>
          <Switch>
            <Route path={'/pageProducts/:type/:id'}>
              <ProductRoutes />
            </Route>
            <Route path={'/pageService/:id'}>
              <ServiceRoutes />
            </Route>
            <Route path={'/account'}>
              <AccountRoutes />
            </Route>
          </Switch>
          <ButtonCloseContent />
        </>
      )}
    </div>
  )
}
