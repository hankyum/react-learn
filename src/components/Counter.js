import React, { Component } from "react";
import { connect } from "react-redux";
import { decrement, increment, reset, test } from "../redux/actions/counter-actions";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Button } from "antd";

const Button = ({children, ...props}) => {
  return <button {...props}>{children}</button>;
};

class IncrementBtn extends Component {
  render() {
    return <Button onClick={this.props.increment}>Add Num</Button>
  }
}

class Counter extends Component {

  constructor(props) {
    // console.log("Constructor of counter props received: ", props);
    super(props);
  }

  _incrementIfOdd() {
    if (this.props.data % 2 === 1) {
      this.props.incrementIfOdd();
    }
  }

  render() {
    const { data, test } = this.props;
    // console.log("From render method: ", this.props);
    return (
      <div>
        <h1>Counter Test3</h1>
        <p>Default Reducer: {data}</p>
        <p>Test Reducer: {test}</p>
        <IncrementBtn {...this.props}/>
        <Button onClick={this.props.increment5}>+5</Button>
        <Button onClick={this.props.reset}>Reset</Button>
        <Button onClick={() => this._incrementIfOdd()}>incrementIfOdd
        </Button>
        <Button onClick={this.props.decrement}>-</Button>
        <Button onClick={this.props.onTest}>Test</Button>
        <a href="/counter/55?test=100">Test with /counter/55?test=100</a>
      </div>
    )
  }
}

Counter.propTypes = {
  data: PropTypes.number,
  test: PropTypes.number
};

export default withRouter(connect(
  (state) => {
    // console.log("When connect state " + JSON.stringify(state));
    return {
      data: state.counter,
      test: state.test
    };
  },
  (dispatch) => {
    return {
      increment: () => {
        dispatch(increment({ num: 1 }));
      },
      increment5: () => dispatch(increment({ num: 5 })),
      reset: () => dispatch(reset(0)),
      decrement: () => dispatch(decrement(-1)),
      incrementIfOdd: () => {
        dispatch(increment({ num: 1 }));
      },
      onTest: () => {
        dispatch(test(1));
      }
    }
  }
)(Counter));
