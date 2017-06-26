import React, { Component } from "react";
import { connect } from "react-redux";
import { decrement, increment, reset, test } from "../redux/actions/counter-actions";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from "antd";
import { bindActionCreators } from "redux";

class IncrementBtn extends Component {
  render() {
    return <Button onClick={() => this.props.increment(1)}>Add Num</Button>
  }
}

class Counter extends Component {

  constructor(props) {
    super(props);
  }

  _incrementIfOdd() {
    if (this.props.counterResult % 2 === 1) {
      this.props.increment(1);
    }
  }

  render() {
    const { counterResult, testResult, decrement, increment, reset, test } = this.props;
    return (
      <div>
        <h1>Counter Test3</h1>
        <p>Default Reducer: {counterResult}</p>
        <p>Test Reducer: {testResult}</p>
        <IncrementBtn {...this.props}/>
        <Button onClick={() => increment(5)}>+5</Button>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={() => this._incrementIfOdd()}>incrementIfOdd
        </Button>
        <Button onClick={() => decrement(-1)}>-</Button>
        <Button onClick={() => test()}>Test</Button>
        <a href="/counter/55?test=100">Test with /counter/55?test=100</a>
      </div>
    )
  }
}

Counter.propTypes = {
  counterResult: PropTypes.number,
  testResult: PropTypes.number
};

export default withRouter(connect(
  (state) => {
    return {
      counterResult: state.counter,
      testResult: state.test
    };
  },
  (dispatch) => bindActionCreators({ decrement, increment, reset, test }, dispatch)
)(Counter));
