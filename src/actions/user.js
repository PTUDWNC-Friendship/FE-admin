import fetch from 'cross-fetch';
import * as types from '../helpers/action-type';
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

function getCurrentTutor(tutor) {
  return {
    type: types.GET_CURRENT_TUTOR,
    tutor
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

function addSubject() {
  return {
    type: types.INSERT_TUTOR_SUBJECT,
  };
}


function removeSubject() {
  return {
    type: types.DELETE_TUTOR_SUBJECT
  };
}

function loginFailed() {
  return {
    type: types.LOGIN_FAILED
  };
}


export function login(email, password, type) {
  return function(dispatch) {
    dispatch(requestLogin());
    return fetch(`${SERVER_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        type
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(data => {
        if(data.user)
        {
          dispatch(getCurrentUser(data));
        }
        else {
          dispatch(loginFailed());
        }
      })
      .catch(error => {
        console.log(error);
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
        })
        .catch((error) => {
        });
    };
  }
  return function(dispatch) {
  };
}



export function logout() {
  localStorage.removeItem('authToken');

  return function(dispatch) {
    dispatch(getCurrentUser(null));
  };
}
