/**
 * Created by hguo on 4/16/16.
 */
import React from "react";
import { renderToString } from "react-dom/server";
import configureStore from '../js/redux/store/configureStore';
import App from '../js/components/App';
import serialize from 'serialize-javascript';

let scriptSrcs = [
  'http://localhost:3001/static/bundle.js'
];

export default (server) => {
  server.get('*', (req, res, next) => {
    const initData = {
      counter: 4,
      test: 5
    };
    const store = configureStore(initData);
    const context = {};
    const html = renderToString(
      <App
        server
        store={store}
        location={req.url}
        context={context}
      />
    )

    if (context.url) {
      res.redirect(context.url);
    } else {
      console.log("Server side rendering ...");
      res.render('index', {
        html, scriptSrcs, reduxState: serialize(store.getState())
      });
    }
    next();
  });
};




