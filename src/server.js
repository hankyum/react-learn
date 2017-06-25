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

const app = express();
const port = process.env.NODE_PORT || 3000;
const executeActions = (path, query, dispatch) => {
  const promises =
    routes
      .map((route) => ( { route, match: matchPath(path, route) } ))
      .filter(({ route, match }) => match && route.actions)
      .map(({ route, match }) =>
        route.actions.forEach(action => {
          const finalParams = { ...match.params, ...query };
          const actionFun = action(finalParams);
          console.log(" Final params to prefetch actions ", finalParams);
          actionFun && dispatch(actionFun);
        })
      );

  return Promise.all(promises);
};

app.use(express.static(path.resolve(__dirname, 'public')));

app.get("*", (req, res, next) => {
  const initData = {};
  const store = configureStore(initData);
  executeActions(req.path, req.query, store.dispatch);

  const css = new Set();

  // Global (context) variables that can be easily accessed from any React component
  // https://facebook.github.io/react/docs/context.html
  const context = {
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    insertCss: (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    }/*,
     // Universal HTTP client
     fetch: createFetch({
     baseUrl: config.api.serverUrl,
     cookie: req.headers.cookie,
     }),*/
  };

  const data = {};
  data.children = renderToString(
    <App
      server
      store={store}
      location={req.url}
      context={context}
    />
  );
  console.log("Server side rendering css ", [...css].join(''));
  data.styles = [
    { id: 'css', cssText: [...css].join('') },
  ];
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
    const html = renderToStaticMarkup(<Html {...data} />);
    res.status(200);
    res.send(`<!doctype html>${html}`);
  }
  next();
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


