import { createStore, applyMiddleware, bindActionCreators, combineReducers} from "redux";
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default (reducers = {}, initialState = {}) =>
  createStoreWithMiddleware(combineReducers(reducers), initialState);