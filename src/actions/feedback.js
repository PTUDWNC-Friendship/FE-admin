import fetch from "cross-fetch";
import * as types from "../helpers/action-type";
import { SERVER_URL } from "../helpers/constant";

function getAllFeedbacks(allFeedbacks) {
  return {
    type: types.GET_ALL_FEEDBACKS,
    allFeedbacks
  };
}





export function fetchAllFeedbacks() {
  return function(dispatch) {
    return fetch(`${SERVER_URL}/feedback/api`)
      .then(response => response.json())
      .then(feedbacks => {
        dispatch(getAllFeedbacks(feedbacks));
      })
      .catch(error => {
        console.log(error);
        dispatch(getAllFeedbacks(null));
      });
  };
}

