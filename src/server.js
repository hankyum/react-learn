require("babel-core/register");
import express from 'express';
import path from 'path';
import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import configureStore from '../src/redux/store/configureStore';
// Used to solve the third party css load error issue
// html { ... error https://segmentfault.com/q/1010000008457885
import csshook from 'css-modules-require-hook/preset';
import App from './components/App';
import Html from "./Html";
import routes from "./components/routes";
import { matchPath } from "react-router";
import assets from "./assets.json";
import flatten from "lodash/flatten";
import { bindActionCreators } from "redux";
const app = express();
const port = process.env.NODE_PORT || 3000;
const executeActions = (path, query, createdStore) => {
  return flatten(
    routes
      .map((route) => ( { route, match: matchPath(path, route) } ))
      .filter(({ route, match }) => match && route.actions)
      .map(({ route, match }) =>
        route.actions.map(action => {
          const actions = bindActionCreators({ action }, createdStore.dispatch);
          return actions.action({ ...match.params, ...query });
        })
      )
  );
};

app.use(express.static(path.resolve(__dirname, 'public')));

app.get("*", (req, res, next) => {
  console.log("--- Server side render start ---");
  try {
    const createdStore = configureStore({});
    const actionPromises = executeActions(req.path, req.query, createdStore);

    // https://facebook.github.io/react/docs/context.html
    const context = {};

    Promise.all(actionPromises)
      .then(() => createdStore)
      .then((store) => {
        const data = {};
        data.children = renderToString(
          <App
            server
            store={store}
            location={req.url}
            context={context}
          />
        );
        data.scripts = [assets.client.js];
        if (assets.vendor) {
          data.scripts.push(assets.vendor.js);
        }
        data.css = assets.client.css;
        data.reduxState = store.getState();
        if (context.url) {
          res.redirect(context.url);
          return;
        } else {
          console.log("--- Server side render end ---", JSON.stringify(data, null, 2));
          const html = renderToStaticMarkup(<Html {...data} />);
          res.send(`<!doctype html>${html}`).status(200);
        }
      });
  } catch (error) {
    next();
  }
});

// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(port, () => {
    console.info(`The server is running at http://localhost:${port}/`);
  });
}

// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept();
}

export default app;


