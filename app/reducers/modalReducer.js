import { SHOW_MODAL, HIDE_MODAL } from '../actions/actionTypes';
import initialState from './initialState';

export const modal = (state = initialState.modal, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return action.modal;

    case HIDE_MODAL:
      return action.modal;

    default:
      return state;
  }
};
