import {combineReducers} from 'redux';
import {userData} from './userReducer';

const rootReducer = combineReducers({
    userData
});

export default rootReducer;
