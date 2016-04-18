import React, {Component} from "react";
import {Link} from 'react-router';

export default class MainApp extends Component {
  render() {
    return (
      <div>
        <h1>React Router App Demos</h1>
        <ul>
          <li><Link to="/hello/Hank">Hello Demo</Link></li>
          <li><Link to="/todo">Flux Demo</Link></li>
          <li><Link to="/counter">Redux Counter Demo</Link></li>
        </ul>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}