import React, {Component} from "react";
import { Router, Route, Link} from 'react-router';
import Hello from "../hello";
import FluxDemo from "../flux/app";
import MainApp from "../Main"
import Counter from "../redux/actions/index";

export default class AppRoute extends Component {

  render() {
    return (
      <Router>
        <Route path="/" component={MainApp}>
          <Route path="hello/:name" component={Hello}/>
          <Route path='todo' component={FluxDemo}/>
          <Route path='counter' component={Counter}/>
        </Route>
      </Router>
    );
  }
}
