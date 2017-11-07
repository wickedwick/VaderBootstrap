export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
import { CALL_API } from '../middleware/api';
export const QUOTE_REQUEST = 'QUOTE_REQUEST';
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS';
export const QUOTE_FAILURE = 'QUOTE_FAILURE';

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    };
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    };
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    };
}

export function loginUser(creds) {
    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: `Email=${creds.username}&Password=${creds.password}`
    };

    return dispatch => {
        dispatch(requestLogin(creds));

        return fetch('http://localhost:28826/api/Account/login', config)
            .then(response =>
                response.json().then(user => ({ user, response }))
            ).then(({ user, response }) => {
                if (!response.ok) {
                    dispatch(loginError(user.message));
                    return Promise.reject(user);
                } else {
                    localStorage.setItem('id_token', user.id_token);
                    localStorage.setItem('access_token', user.access_token);
                    dispatch(receiveLogin(user));
                }
            });
    };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    dispatch(receiveLogout());
  };
}

export function fetchQuote() {
    return {
        [CALL_API]: {
            endpoint: 'api/quote/random',
            types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
        }
    };
}

export function fetchSecretQuote() {
    return {
        [CALL_API]: {
            endpoint: 'api/quote/secret',
            authenticated: true,
            types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
        }
    };
}