import React from 'react'
import { hot } from 'react-hot-loader/root'

import { composeWithDevTools } from 'redux-devtools-extension'

import { Provider } from 'react-redux'

import thunk from 'redux-thunk'

import { applyMiddleware, createStore } from 'redux'
import { YMaps } from 'react-yandex-maps'

import { Layout } from './shared/Layout'
import './main.global.css'
import { Search } from './shared/Search'

import { MapYnd } from './shared/MapYnd'
import { ContainerContent } from './shared/ContainerContent'
import { rootReducer } from './store/reducer'

import EnvConfig from './config/env'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

function AppComponent () {
  return (
    <Provider store={store}>
      <YMaps query={{ apikey: EnvConfig.keyYand }}>
        <Layout>
          <Search />
          <ContainerContent />
          <MapYnd />
        </Layout>
      </YMaps>
    </Provider>
  )
}

export const App = hot(() => <AppComponent />)
