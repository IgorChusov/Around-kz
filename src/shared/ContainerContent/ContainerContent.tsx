import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ButtonCloseContent } from './ButtonCloseContent'
import { PageProduct } from './PageProduct'
import { PageService } from './PageService'
import { PageMenu } from './PageMenu'
import { useToken } from '../../hooks/useToken'

import styles from './containercontent.css'
import { useDispatch, useSelector } from 'react-redux'
import { MeGetUserAsync } from '../../store/me/get/action'
import { RootState } from '../../store/reducer'
import { MeGetState } from '../../store/me/get/reduser'
import { Loading } from '../universalComponent/Loading'
import { RefreshTokenAsync } from '../../store/token/action'
import { TokenState } from '../../store/token/reduser'

export function ContainerContent () {
  const me = useSelector<RootState, MeGetState>((state) => state.me)
  const tokenLocal = useSelector<RootState, TokenState>((state) => state.token)
  const token = useToken()
  const dispatch = useDispatch()
  
  useEffect(()=> {
    if(token.tokenLocalStorage) {
      dispatch(RefreshTokenAsync())
    }
  }, [token.tokenLocalStorage])

  
  useEffect(()=>{
    if(token.token.length === 0)  return
      dispatch(MeGetUserAsync(token.token))
  }, 
  [token.token])

  
  return (
    <div className={styles.content}>
      {(me.loading) && (
        <div className={styles.loading}>
          <Loading loading={me.loading}/>
        </div>
      )}
      {(!me.loading) && (
        <>
          <>
            <Switch>
              <Route path={'/pageProducts/:type/:id'}>
                <PageProduct />
              </Route>
              <Route path={'/pageService/:id'}>
                <PageService />
              </Route>
              <Route path={'/menu'}>
                <PageMenu />
              </Route>
            </Switch>
          </>
          <ButtonCloseContent />
        </>
      )}
    </div>
  )
}
