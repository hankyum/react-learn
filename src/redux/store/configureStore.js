import { createStore, applyMiddleware, combineReducers} from "redux";
import thunk from 'redux-thunk';
import multil from '../middleware/promise-multil';
import {counterReducer, testReducer, userReducer} from "../reducers/counter-reducers";
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  multil,
  promise
)(createStore);

const rootReducer = combineReducers({
  counter: counterReducer,
  test: testReducer,
  user: userReducer
});

export default (initialState = {}) =>
  createStoreWithMiddleware(rootReducer, initialState);