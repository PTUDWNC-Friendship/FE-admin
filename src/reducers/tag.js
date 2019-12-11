import * as types from "../helpers/index";

const initialState = {
  allTags: []
};

const tagState = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_TAGS:
      return { ...state, allTags: action.allTags };
    default:
      return state;
  }
};

export default tagState;
