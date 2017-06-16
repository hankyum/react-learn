import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class extends Component {
  render() {
    return (
      <div>
        <h1>React Router App Demos</h1>
        <ul className="nav">
          <li><Link to="/hello/Hank">Hello Demo</Link></li>
          <li><Link to="/todo">Flux Demo</Link></li>
          <li><Link to="/counter">Redux Counter Demo</Link></li>
        </ul>
      </div>
    )
  }
}