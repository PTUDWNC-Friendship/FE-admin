import * as types from '../helpers/action-type';

const initialState = {
  isFetching: false,
  user: null,
  didInvalidate: false,
  isLogin: false,
  allTutors: [],
  allStudents: [],
  tutor: null,
  student: null
};

const userState = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_LOGIN:
      return { ...state, isFetching: true };
    case types.RECEIVE_LOGIN:
      return { ...state, isFetching: false };
    case types.GET_CURRENT_USER:
      return { ...state, isFetching: false, isLogin: true, user: action.user };
    case types.LOGIN_FAILED:
      return { ...state, isFetching: false, isLogin: false};
    case types.GET_CURRENT_TUTOR:
      return { ...state, tutor: action.tutor };
    case types.GET_ALL_TUTORS:
      return { ...state, allTutors: action.allTutors };
    case types.GET_ALL_STUDENTS:
      return { ...state, allStudents: action.allStudents };

    case types.INSERT_TUTOR_SUBJECT:
      return state;
    case types.DELETE_TUTOR_SUBJECT:
      return state;
    default:
      return state;
  }
};

export default userState;
