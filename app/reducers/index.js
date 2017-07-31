import { users, user} from './userReducer';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  user: user,
  users: users
});
export default rootReducer;