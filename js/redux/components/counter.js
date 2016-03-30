/**
 * Created by hguo on 3/30/16.
 */
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {decrement, increment, reset} from "../actions/counter-actions";
import {counterReducer} from "../reducers/counter-reducers";
import configStore from "../redux/configure-store";

class IncrementBtn extends Component {
  render() {
    return <button onClick={this.props.increment}>Add Num</button>
  }
}

class Counter extends Component {
  render() {
    return (
      <div>
        <h1>Counter</h1>
        <p>{this.props.state}</p>
        <IncrementBtn {...this.props}/>
        <button onClick={this.props.increment5}>+5</button>
        <button onClick={this.props.reset}>Reset</button>
        <button onClick={this.props.incrementIfOdd}>incrementIfOdd</button>
        <button onClick={this.props.decrement}>-</button>
        <IncrementBtn {...this.props}/>
      </div>
    )
  }
}

let App = connect(
  (state) => {
    return {
      state: state.counter
    };
  },
  (dispatch, getState) => {
    return {
      increment: () => dispatch(increment({num: 1})),
      increment5: () => dispatch(increment({num: 5})),
      reset: () => dispatch(reset(0)),
      decrement: () => dispatch(decrement(-1)),
      incrementIfOdd: ()=> {
        console.log(getState);
        const counter = getState();
        console.log(counter);
        if (counter.counter % 2 === 0) {
          return;
        }
        dispatch(increment({num: 1}));
      }
    }
  //{
  //  incrementIfOdd: ()=> {
  //  return (dispatch, getState) => {
  //    console.log(getState);
  //    const counter = getState();
  //    console.log(counter);
  //    if (counter.counter % 2 === 0) {
  //      return;
  //    }
  //    dispatch(increment({num: 1}));
  //  }
  //}
}
)
(Counter);

export default class CounterApp extends Component {
  render() {
    return <Provider store={configStore({
      counter: counterReducer
    })}>
      <App/>
    </Provider>
  }
}
