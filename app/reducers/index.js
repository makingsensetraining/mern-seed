import {combineReducers} from 'redux';
import {users, user, canSubmit, saving, userToDelete} from './userReducer';
import { modal } from './modalReducer';
import { alert } from './alertReducer';

const rootReducer = combineReducers({
  users,
  user,
  canSubmit,
  saving,
  userToDelete,
  modal,
  alert
});

export default rootReducer;
