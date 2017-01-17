import {combineReducers} from 'redux';
import {userData, user} from './userReducer';

const rootReducer = combineReducers({
    userData,
    user
});

export default rootReducer;
