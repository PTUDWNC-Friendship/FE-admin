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
        dispatch(getCurrentUser(null));
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
        dispatch(getCurrentUser(null));
      });
  };
}

export function fetchUserById(id) {
  return function(dispatch) {
    return fetch(`${SERVER_URL}/user/api/${id}`)
      .then(response => response.json() )
      .then(user => {
        if (user.role === 'tutor') {
          if (user.subjects !== null) {
            fetch(`${SERVER_URL}/user/tutor/${id}/subjects`)
              .then(response => response.json())
              .then(subjects => {
                user.subjects = subjects;
                dispatch(getCurrentTutor(user));
              });
          }
        } else {
          dispatch(getCurrentUser(user));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(getCurrentUser(null));
      });
  };
}

export function updateUser(user) {
  return function(dispatch) {
    console.log(user);
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
        dispatch(getCurrentUser(data));
        dispatch(receiveLogin());
      })
      .catch((error) => {
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
      .then(response => response.json())
      .then(data => {
        dispatch(getCurrentUser(data));
        dispatch(receiveLogin());
      })
      .catch((error) => {
        dispatch(getCurrentUser(null));
      });
  };
}

export function insertTutorSubject(_id, _idSubject) {
  return function(dispatch) {
    dispatch(requestLogin());
    return fetch(`${SERVER_URL}/user/tutor/insert/subject`, {
      method: 'POST',
      body: JSON.stringify({
        _id,
        _idSubject
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(addSubject());
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteTutorSubject(_id, _idSubject) {
  return function(dispatch) {
    dispatch(requestLogin());
    return fetch(`${SERVER_URL}/user/tutor/delete/subject`, {
      method: 'POST',
      body: JSON.stringify({
        _id,
        _idSubject
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(data => {
        dispatch(removeSubject());
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function loginGoogle(user) {
  return function(dispatch) {
    if (user) {
      localStorage.setItem('authToken', user.token);
      dispatch(getCurrentUser(user));
    }
  };
}

export function logout() {
  localStorage.removeItem('authToken');

  return function(dispatch) {
    dispatch(getCurrentUser(null));
  };
}
