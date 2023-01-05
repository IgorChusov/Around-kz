import React from 'react'
import thunk from 'redux-thunk'
import { hot } from 'react-hot-loader/root'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { YMaps } from 'react-yandex-maps'
import { Layout } from './shared/components/Layout'
import { Search } from './shared/components/Search'
import { MapYnd } from './shared/components/MapYnd'
import { rootReducer } from './store/reducer'
import EnvConfig from './config/env'
import { Routes } from './shared/routes'
import { AgreementCookiePopup } from './shared/components/popups/AgreementCookiePopup'
import './main.global.css'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

function AppComponent () {

  return (
    <Provider store={store}>
      <YMaps query={{ apikey: EnvConfig.keyYand }}>
        <Layout>
          <Search />
          <Routes />
          <MapYnd />
          <AgreementCookiePopup />
        </Layout>
      </YMaps>
    </Provider>
  )
}

export const App = hot(() => <AppComponent />)
