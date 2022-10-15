import React from 'react'
import { hot } from 'react-hot-loader/root'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { YMaps } from 'react-yandex-maps'
import { Layout } from './shared/components/Layout'
import { Search } from './shared/components/Search'
import { MapYnd } from './shared/components/MapYnd'
// import { ContainerContent } from './shared/ContainerContent'
import { rootReducer } from './store/reducer'
import EnvConfig from './config/env'

import './main.global.css'
import { Routes } from './shared/Routes'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

function AppComponent () {

  return (
    <Provider store={store}>
      <YMaps query={{ apikey: EnvConfig.keyYand }}>
        <Layout>
          <Search />
          <Routes />
          <MapYnd />
        </Layout>
      </YMaps>
    </Provider>
  )
}

export const App = hot(() => <AppComponent />)
