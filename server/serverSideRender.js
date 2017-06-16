import React from "react";
import { renderToString } from "react-dom/server";
import configureStore from '../src/redux/store/configureStore';
import App from '../src/components/App';
import serialize from 'serialize-javascript';

export default (stats) => {
  return (req, res, next) => {
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
        html, reduxState: serialize(store.getState())
      });
    }
    next();
  };
};




