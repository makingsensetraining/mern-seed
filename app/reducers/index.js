import {combineReducers} from 'redux';
import {users, user} from './userReducer';

const rootReducer = combineReducers({
  users,
  user
});

export default rootReducer;
