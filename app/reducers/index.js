import {combineReducers} from 'redux';
import {users, user, alert, canSubmit, saving, userToDelete} from './userReducer';

const rootReducer = combineReducers({
  users,
  user,
  alert,
  canSubmit,
  saving,
  userToDelete
});

export default rootReducer;
