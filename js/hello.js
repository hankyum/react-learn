import Styles from '../styles/hello.css';
import React from 'react';

export default class Hello extends React.Component {
  render() {
    return (
      <div className="test-background">
        <h1>
          Hello, {this.props.params.name}
        </h1>
      </div>
    );
  }
}