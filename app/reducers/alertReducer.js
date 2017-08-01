import { SHOW_ALERT_SUCCESS, HIDE_ALERT_SUCCESS } from '../actions/actionTypes';
import initialState from './initialState';

export const alert = (state = initialState.alert, action) => {
  switch (action.type) {
    case SHOW_ALERT_SUCCESS:
      return action.alert;

    case HIDE_ALERT_SUCCESS:
      return action.alert;

    default:
      return state;
  }
};
