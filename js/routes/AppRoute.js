import React, {Component} from "react";
import {Router, Route} from 'react-router';
//import Hello from "../hello";
import FluxDemo from "../flux/app";
import MainApp from "./Main"
import Counter from "../redux/components/counter";

import configStore from "../redux/store/configureStore";
import {Provider} from "react-redux";

class CounterApp extends Component {
  render() {
    return <Provider store={configStore()}>
      <Counter/>
    </Provider>
  }
}

export const routes = /*function (history) {
 return (<Router history={history}>
 <Route path="/" component={MainApp}>
 <Route path='todo' component={FluxDemo}/>
 <Route path='counter' component={CounterApp}/>
 </Route>
 </Router>);
 };*/
{
  path: "counter",
  component: CounterApp
};
export default class extends Component {
  render() {
    return <Router>
      <Route path="/" component={MainApp}>
        <Route path='todo' component={FluxDemo}/>
        <Route path='counter' component={CounterApp}/>
      </Route>
    </Router>;
  }
}


