import {combineReducers} from 'redux';
import {users, user, alert, canSubmit, saving, userToDelete} from './userReducer';
import { modal } from './modalReducer';

const rootReducer = combineReducers({
  users,
  user,
  alert,
  canSubmit,
  saving,
  userToDelete,
  modal
});

export default rootReducer;
