import { combineReducers } from 'redux';
import userState from './user';

const myReducer = combineReducers ({
    userState
});
export default myReducer;