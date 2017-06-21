import express from 'express';
import path from 'path';
import React from "react";
import { renderToString } from "react-dom/server";
import configureStore from '../src/redux/store/configureStore';
import App from '../src/components/App';
import serialize from 'serialize-javascript';
import routes from "../src/components/routes";
import { matchPath } from "react-router";

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

app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'ejs');

app.get("*", (req, res, next) => {
  console.log("Request path ", req.path);
  console.log("Request query ", req.query);
  const initData = {};
  const store = configureStore(initData);
  executeActions(req.path, req.query, store.dispatch);
  const context = {};
  const html = renderToString(
    <App
      server
      store={store}
      location={req.url}
      context={context}
    />
  );

  console.log(" Context object of renderToString ", context);

  if (context.url) {
    res.redirect(context.url);
  } else {
    console.log("Server side rendering ...");
    res.render('index', {
      html,
      reduxState: serialize(store.getState())
    });
  }
  next();
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
  app.listen(port, () => {
    console.info(`The server is running at http://localhost:${port}/`);
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;


