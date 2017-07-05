import { createAction } from "redux-actions";
import {
  INCREMENT, DECREMENT, RESET, TEST,
  USER_FETCH_ERROR,
  USER_FETCH_SUCCESS,
  USER_FETCH_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS,
  USER_CREATE_SUCCESS
}
  from "./action-types";
import get, { post, put, del } from '../createFetch';

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
export const reset = createAction(RESET);
export const test = createAction(TEST);

const fetchUserRequest = createAction(USER_FETCH_REQUEST);
const fetchUserSuccess = createAction(USER_FETCH_SUCCESS);
const fetchUserError = createAction(USER_FETCH_ERROR);

const createUserSuccess = createAction(USER_CREATE_SUCCESS);
const updateUserSuccess = createAction(USER_UPDATE_SUCCESS);
const deleteUserSuccess = createAction(USER_DELETE_SUCCESS);

const match = (global.configMode || '').match(/mocks:?([0-9]*)/);

const apiBase = `http://localhost:${match ? match[1] : '8000'}`;
const userURL = `${apiBase}/api/users`;

export const fetchUser = () => async dispatch => {
  dispatch(fetchUserRequest());
  try {
    const response = await get(userURL);
    const data = await response.json();
    dispatch(fetchUserSuccess(data));
  } catch (error) {
    dispatch(fetchUserError(error));
  }
};

export const createUser = (user) => async (dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const response = await post(userURL, {
      body: JSON.stringify({...user})
    });
    const data = await response.json();
    dispatch(createUserSuccess(data));
  } catch (error) {
    dispatch(fetchUserError(error));
  }
};

export const updateUser = (user) => async (dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const response = await put(userURL, {
      body: JSON.stringify({...user})
    });
    const data = await response.json();
    dispatch(updateUserSuccess(data));
  } catch (error) {
    dispatch(fetchUserError(error));
  }
};

export const deleteUser = (user) => async (dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const response = await del(userURL, {
      body: JSON.stringify({...user})
    });
    const data = await response.json();
    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(fetchUserError(error));
  }
};