import {
  INCREMENT, DECREMENT, RESET, TEST,
  USER_FETCH_ERROR,
  USER_FETCH_SUCCESS,
  USER_FETCH_REQUEST,
  USER_CREATE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS
} from "../actions/action-types";
import { handleActions } from "redux-actions";

export const counterReducer = handleActions({
  [INCREMENT]: (state, { payload }) => {
    return state + payload
  },
  [DECREMENT]: (state, { payload = -1 }) => state + payload,
  [RESET]: () => 0
}, 0);

export const testReducer = handleActions({
  [TEST]: (state, { payload }) => {
    return state + payload;
  }
}, 0);

export const userReducer = handleActions({
  [USER_FETCH_REQUEST]: (state) => ({ ...state, loading: true }),
  [USER_FETCH_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      list: payload,
      loading: false,
      fetch: true
    }
  },
  [USER_CREATE_SUCCESS]: (state, { payload }) =>
    ({ ...state, list: [payload, ...state.list], loading: false }),
  [USER_UPDATE_SUCCESS]: (state, { payload }) =>
    ({ ...state, list: [payload, ..._.dropWhile(state.list, _.pick(payload, "id"))], loading: false }),
  [USER_DELETE_SUCCESS]: (state, { payload }) =>
    ({ ...state, list: [..._.dropWhile(state.list, _.pick(payload, "id"))], loading: false }),
  [USER_FETCH_ERROR]: (state) => ({ ...state, loading: false })
}, {fetch: false, list: []});