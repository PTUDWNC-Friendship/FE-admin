import { combineReducers } from 'redux';
import userState from './user';
import tagState from './tag';
const myReducer = combineReducers ({
    userState, tagState
});
export default myReducer;