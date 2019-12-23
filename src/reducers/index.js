import { combineReducers } from 'redux';
import userState from './user';
import subjectState from './subject';
import contractState from './contract';
import feedbackState from './feedback';
const myReducer = combineReducers ({
    userState,
    subjectState,
    contractState,
    feedbackState
});
export default myReducer;