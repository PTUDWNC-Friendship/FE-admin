import * as types from '../helpers/action-type';

const initialState = {
  allFeedbacks: []
};

const feedbackState = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_FEEDBACKS:
      return { ...state, allFeedbacks: action.allFeedbacks };
    default:
      return state;
  }
};

export default feedbackState;
