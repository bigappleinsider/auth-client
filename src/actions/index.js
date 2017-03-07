import axios from 'axios';

import { browserHistory } from 'react-router';

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3091'


export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch( (response) => {
        dispatch(authError(response.response.data.error));
      })
    //dispatch({ type: })
  }
}


export function signinUser({ email, password }) {
  // Submit email/password to the server

  /*
  If request is good...
  - Update state to indicate user is authenticated
  - Save the JWT token
  - redirect to the route '/feature'

  If the request is bad
  - show erros to the user
  JS promises

  Localstorage is not shared accross domains
  */
  //We can dispatch any functions we want
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(() => {
        dispatch(authError('Bad login info'));
      })
    //dispatch({ type: })
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  }
}


export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
