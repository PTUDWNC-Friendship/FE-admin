import fetch from "cross-fetch";
import * as types from "../helpers/index";
import { SERVER_URL } from "../helpers/constant";

function getAllSubject(allSubjects) {
  return {
    type: types.GET_ALL_SUBJECTS,
    allSubjects
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
        dispatch(getAllSubject(null));
      });
  };
}
