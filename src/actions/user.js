import fetch from 'cross-fetch';
import * as types from '../helpers/index';
import { SERVER_URL } from '../helpers/constant';

function requestLogin() {
  return {
    type: types.REQUEST_LOGIN
  };
}

function receiveLogin() {
  return {
    type: types.RECEIVE_LOGIN
  };
}

function getCurrentUser(user) {
  return {
    type: types.GET_CURRENT_USER,
    user
  };
}

function getAllTutors(allTutors) {
  return {
    type: types.GET_ALL_TUTORS,
    allTutors
  };
}

function getAllStudents(allStudents) {
  return {
    type: types.GET_ALL_STUDENTS,
    allStudents
  };
}

function getAllTags(allTags) {
  return {
    type: types.GET_ALL_TAGS,
    allTags
  };
}


export function login(username, password) {
  return function(dispatch) {
    dispatch(requestLogin());
    return fetch(`${SERVER_URL}/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json.user !== false) {
          localStorage.setItem('authToken', json.token);
          dispatch(getCurrentUser(json));
        }
        dispatch(receiveLogin(json));
      })
      .catch(() => {
        dispatch(receiveLogin(null));
      });
  };
}


export function authorizeUser() {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    return function(dispatch) {
      return fetch(`${SERVER_URL}/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => response.json() )
        .then(user => {
          dispatch(getCurrentUser(user));
        })
        .catch((error) => {
          dispatch(getCurrentUser(null));
        });
    };
  }
  return function(dispatch) {
    dispatch(getCurrentUser(null));
  };
}

export function fetchAllTutors() {
  return function(dispatch) {
    return fetch(`${SERVER_URL}/user/get-all-tutors`)
      .then(response => response.json() )
      .then(users => {
        dispatch(getAllTutors(users));
      })
      .catch((error) => {
        dispatch(getAllTutors(null));
      });
  };
}

export function fetchAllStudents() {
  return function(dispatch) {
    return fetch(`${SERVER_URL}/user/get-all-students`)
      .then(response => response.json() )
      .then(users => {
        dispatch(getAllStudents(users));
      })
      .catch((error) => {
        dispatch(getAllStudents(null));
      });
  };
}

export function fetchAllTags() {
  return function(dispatch) {
    return fetch(`${SERVER_URL}/tag/api`)
      .then(response => response.json() )
      .then(tags => {
        dispatch(getAllTags(tags));
      })
      .catch((error) => {
        dispatch(getAllTags(null));
      });
  };
}

export function updateUser(user) {
  return function(dispatch) {
    dispatch(requestLogin());
    return fetch(`${SERVER_URL}/user/update`, {
      method: 'POST',
      body: JSON.stringify({
        ...user
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json() )
      .then(data => {
      console.log("TCL: updateUser -> data", data);
        dispatch(getCurrentUser(data));
        dispatch(receiveLogin());
      })
      .catch((error) => {
      console.log("TCL: updateUser -> error", error);
        
        dispatch(getCurrentUser(null));
      });
  };
}

export function updateTutor(tutor) {
  return function(dispatch) {
    dispatch(requestLogin());
    return fetch(`${SERVER_URL}/user/tutor/update`, {
      method: 'POST',
      body: JSON.stringify({
        ...tutor
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json() )
      .then(data => {
      console.log("TCL: updateUser -> data", data);
        dispatch(getCurrentUser(data));
        dispatch(receiveLogin());
      })
      .catch((error) => {
      console.log("TCL: updateUser -> error", error);
        
        dispatch(getCurrentUser(null));
      });
  };
}

export function logout() {
  localStorage.removeItem('authToken');

  return function(dispatch) {
    dispatch(getCurrentUser(null));
  };
}
