import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ButtonCloseContent } from './ButtonCloseContent'
import { PageProduct } from './PageProduct'
import { PageService } from './PageService'
import { PageMenu } from './PageMenu'
import { useToken } from '../../hooks/useToken'

import styles from './containercontent.css'
import { useDispatch } from 'react-redux'
import { MeGetUserAsync } from '../../store/me/get/action'

export function ContainerContent () {
  const token = useToken()
  const dispatch = useDispatch()
  useEffect(()=>{
    if(token.token.length === 0 && token.tokenLocalStorage?.length === 0 )  return
    dispatch(MeGetUserAsync())
  }, 
  [token.token, token.tokenLocalStorage])
  return (
    <div className={styles.content}>
      <div>
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
      </div>
      <ButtonCloseContent />
    </div>
  )
}
