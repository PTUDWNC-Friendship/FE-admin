import { combineReducers } from 'redux';
import userState from './user';
import subjectState from './subject';
import contractState from './contract';

const myReducer = combineReducers ({
    userState,
    subjectState,
    contractState
});
export default myReducer;