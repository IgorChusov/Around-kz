import React from 'react'
import { Route, Switch } from 'react-router'
import { PaddingContainer } from '../PaddingContainer'
import { PageFeedback } from './components/PageFeedback'
import { PageInformation } from './components/PageInformation'
import { SettingsMenu } from './components/SettingsMenu'

export function Settings () {
  return (
    <PaddingContainer>
      <Switch>
        <Route path="/menu/account/settings/feedback">
          <PageFeedback />
        </Route>
        <Route path="/menu/account/settings/information">
          <PageInformation />
        </Route>
        <Route path="/menu/account/settings">
          <SettingsMenu />
        </Route>
      </Switch>
    </PaddingContainer>
  )
}
