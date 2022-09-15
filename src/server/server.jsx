import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { App } from '../App';
import { indexTemplate } from './indexTemplate'
import { StaticRouter} from "react-router";
import favicon from 'serve-favicon';
import compression from 'compression'
import helmet from 'helmet'
const NODE_ENV = process.env.NODE_ENV
const IS_PROD = NODE_ENV === 'production'
const PORT = process.env.PORT || 3000

const app = express();

if(IS_PROD) {
  app.use(compression())
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  }))
}

app.use(favicon('./public/64x64.ico'))
app.use('/static', express.static('./dist/client'))

app.get('*', (req, res) => {
  const context = {};
  res.send(
    indexTemplate(ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
       {App()}
      </StaticRouter> 
      )),)
})

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
