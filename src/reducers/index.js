import { combineReducers } from 'redux';
import userState from './user';
import tagState from './tag';
import subjectState from './subject';

const myReducer = combineReducers ({
    userState, tagState, subjectState
});
export default myReducer;