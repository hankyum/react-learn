import {createStore, applyMiddleware, bindActionCreators} from "redux";
import thunk from 'redux-thunk';
import {connect, Provider} from "react-redux";
import React, {Component} from "react";

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

function counter(state = 1, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      return state;
  }
}

let increment = () => {
  return {
    type: "INCREMENT"
  };
};

let decrement = () => {
  return {
    type: "DECREMENT"
  };
};

let incrementIfOdd = ()=> {
  return (dispatch, getState) => {
    const counter = getState();

    if (counter % 2 === 0) {
      return
    }

    dispatch(increment())
  }
}

let reset = ()=> {
  return {
    type: "RESET"
  };
};

class Counter extends Component {
  render() {
    return (
      <div>
        <h1>Counter</h1>
        <p>{this.props.state}</p>
        <button onClick={this.props.increment}>+</button>
        <button onClick={this.props.reset}>Reset</button>
        <button onClick={this.props.incrementIfOdd}>incrementIfOdd</button>
        <button onClick={this.props.decrement}>-</button>
      </div>
    )
  }
}

let App = connect(
  (state) => {
    return {
      state: state
    };
  },
  (dispatch) => {
    return bindActionCreators({
      increment, decrement, incrementIfOdd, reset
    }, dispatch);
  }

  //{
  //  increment: ()=> {
  //    return (dispatch, getState) => {
  //      dispatch({
  //        type: "INCREMENT"
  //      })
  //    };
  //  }
  //}
)
(Counter);


export default class CounterApp extends Component {
  render() {
    return <Provider store={createStoreWithMiddleware(counter)}>
      <App></App>
    </Provider>
  }
}




