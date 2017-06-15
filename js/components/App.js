import React from 'react'
import { canUseDOM } from "exenv";
import { Provider } from 'react-redux'
import { BrowserRouter, StaticRouter, Switch, Route } from 'react-router-dom'
import Counter from "./Counter";
import FluxDemo from "../flux/app";
import Header from "./Header"
import Hello from "./hello";
import configStore from "../redux/store/configureStore";

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
  let router

  if (server) {
    router = (
      <StaticRouter
        location={location}
        context={context}
      >
        {routes}
      </StaticRouter>
    )
  } else {
    router = (
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    )
  }

  return (
    <Provider store={store || configStore(canUseDOM && window.__REDUX_STATE__ || {})}>
      {router}
    </Provider>
  )
}




