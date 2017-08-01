import { combineReducers } from 'redux';
import {
    users,
    user,
    canSubmitUser,
    savingUser,
    userToDelete
} from './userReducer';
import { modal } from './modalReducer';
import { alert } from './alertReducer';
const rootReducer = combineReducers({
    modal,
    alert,
    users,
    user,
    canSubmitUser,
    savingUser,
    userToDelete
});
export default rootReducer;
