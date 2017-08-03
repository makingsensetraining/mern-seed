import {
    users,
    user
} from './userReducer';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    user,
    users
});
export default rootReducer;