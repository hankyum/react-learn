/**
 * Created by hguo on 4/16/16.
 */
import React from 'react';
import ReactDOMServer from "react-dom/server";
import { createMemoryHistory, useQueries } from 'history';
import { Provider } from 'react-redux';
import { RoutingContext, match } from "react-router";
import configureStore from './js/redux/store/configureStore';
import {routes} from './js/routes/AppRoute';

let scriptSrcs = [
  'http://localhost:3001/static/bundle.js'
];

export default (server) => {
  server.get('*', (req, res, next)=> {
    let location = req.url;
    match({routes, location}, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        res.status(500).send(error.message);
      } else if (renderProps == null) {
        res.status(404).send('Not found')
      } else {
        let html = ReactDOMServer.renderToString(<RoutingContext {...renderProps}/>);
        res.render('index', {html, scriptSrcs, reduxState: ""});
      }
    });
    next();
  });
};




