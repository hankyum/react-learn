import React from 'react'
import { canUseDOM } from "exenv";
import { Provider } from 'react-redux'
import { BrowserRouter, StaticRouter, Switch, Route } from 'react-router-dom'
import Header from "./Header"
import configStore from "../redux/store/configureStore";
import "../styles/app.css";
import routes from "./routes";

const RouteApp = (
  <div>
    <Header/>
    <div className="main-content">
      <Switch>
        { routes.map( route => <Route key={ route.path } { ...route } /> ) }
      </Switch>
    </div>
  </div>
);

export default ({ server, location, context, store }) => {
  return (
    <Provider store={store || configStore(canUseDOM && window.__PRELOADED_STATE__ || {})}>
      {
        server ?
          (
            <StaticRouter location={location} context={context}>
              {RouteApp}
            </StaticRouter>) :
          (
            <BrowserRouter>
              {RouteApp}
            </BrowserRouter>
          )
      }
    </Provider>
  )
};




