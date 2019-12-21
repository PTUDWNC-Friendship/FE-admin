import fetch from "cross-fetch";
import * as types from "../helpers/action-type";
import { SERVER_URL } from "../helpers/constant";

function getAllSubject(allSubjects) {
  return {
    type: types.GET_ALL_SUBJECTS,
    allSubjects
  };
}

function addSubject(subject) {
  return {
    type: types.INSERT_SUBJECT,
    subject
  };
}

function updateSubject(subject) {
  return {
    type: types.EDIT_SUBJECT,
    subject
  };
}

function removeSubject(subject) {
  return {
    type: types.DELETE_SUBJECT,
    subject
  };
}



export function fetchAllSubjects() {
  return function(dispatch) {
    return fetch(`${SERVER_URL}/subject/api`)
      .then(response => response.json())
      .then(tags => {
        dispatch(getAllSubject(tags));
      })
      .catch(error => {
        console.log(error);
        dispatch(getAllSubject(null));
      });
  };
}


export function insertSubject(name, category, description) {
  return function(dispatch) {
    // window.alert(name);
    return fetch(`${SERVER_URL}/subject/insert`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        category,
        description
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json() )
      .then(data => {
        window.alert("Subject added!");
        dispatch(addSubject(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(addSubject(null));
      });
  };
}

export function editSubject(_id, name, category, description) {
    return function(dispatch) {
      // window.alert(name);
      return fetch(`${SERVER_URL}/subject/update`, {
        method: 'POST',
        body: JSON.stringify({
          _id,
          name,
          category,
          description
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => response.json() )
        .then(data => {
          window.alert("Subject updated!");
          dispatch(updateSubject(data));
        })
        .catch((error) => {
          console.log(error);
          dispatch(updateSubject(null));
        });
    };
};

export function deleteSubject(_id) {
  return function(dispatch) {
    // window.alert(name);
    return fetch(`${SERVER_URL}/subject/delete`, {
      method: 'DELETE',
      body: JSON.stringify({
        _id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then(response => response.json() )
      .then(data => {
        window.alert("Subject deleted!");
        dispatch(removeSubject(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(removeSubject(null));
      });
  };
}
