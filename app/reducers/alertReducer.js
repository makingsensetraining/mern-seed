import { SHOW_ALERT, HIDE_ALERT } from '../actions/actionTypes';
import initialState from './initialState';

export const alert = (state = initialState.alert, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return action.alert;

    case HIDE_ALERT:
      return action.alert;

    default:
      return state;
  }
};
