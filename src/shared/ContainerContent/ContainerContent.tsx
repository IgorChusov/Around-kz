import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ButtonCloseContent } from './ButtonCloseContent'
import styles from './containercontent.css'
import { PageProduct } from './PageProduct'
import { PageService } from './PageService'
import { PageMenu } from './PageMenu'

export function ContainerContent () {
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
