import React from 'react'
import { canUseDOM } from "exenv";
import { Provider } from 'react-redux'
import { BrowserRouter, StaticRouter, Switch, Route } from 'react-router-dom'
import Counter from "./Counter";
import FluxDemo from "../flux/app";
import Header from "./Header"
import Hello from "./Hello";
import configStore from "../redux/store/configureStore";
import "../styles/app.css";

const routes = (
  <div>
    <Header/>
    <Switch>
      <Route path='/counter' component={Counter}/>
      <Route path='/todo' component={FluxDemo}/>
      <Route path='/hello/Hank' component={Hello}/>
    </Switch>
  </div>
);

export default ({ server, location, context, store }) => {
  return (
    <Provider store={store || configStore(canUseDOM && window.__PRELOADED_STATE__ || {})}>
      {
        server ?
          (
            <StaticRouter location={location} context={context}>
              {routes}
            </StaticRouter>) :
          (
            <BrowserRouter>
              {routes}
            </BrowserRouter>
          )
      }
    </Provider>
  )
};




