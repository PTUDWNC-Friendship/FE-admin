import * as types from "../helpers/action-type";

const initialState = {
  allSubjects: [],
  subject: null
};

const subjectState = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_SUBJECTS:
      return { ...state, allSubjects: action.allSubjects };
    case types.INSERT_SUBJECT:
      return { ...state, subject: action.subject };
    case types.EDIT_SUBJECT:
      return { ...state, subject: action.subject };
    case types.DELETE_SUBJECT:
      return { ...state, subject: action.subject };
    default:
      return state;
  }
};

export default subjectState;
