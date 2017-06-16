import React from "react";
import { renderToString } from "react-dom/server";
import configureStore from '../src/redux/store/configureStore';
import App from '../src/components/App';
import serialize from 'serialize-javascript';
import routes from "../src/components/routes";
import { matchPath } from "react-router";

const executeActions = (path, query, dispatch) => {
  const promises =
    routes
      .map((route) => ( { route, match: matchPath(path, route) } ))
      .filter(({ route, match }) => match && route.actions)
      .map(({ route, match }) =>
        route.actions.forEach(action => {
          const finalParams = {...match.params, ...query};
          const actionFun = action(finalParams);
          console.log(" Final params to prefetch actions ", finalParams);
          actionFun && dispatch(actionFun);
        })
      );

  return Promise.all(promises);
};

export default (stats) => {
  return (req, res, next) => {
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
        html, reduxState: serialize(store.getState())
      });
    }
    next();
  };
};




