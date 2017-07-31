import { SHOW_MODAL_SUCCESS, HIDE_MODAL_SUCCESS } from '../actions/actionTypes';
import initialState from './initialState';

export const modal = (state = initialState.modal, action) => {
  switch (action.type) {
    case SHOW_MODAL_SUCCESS:
      return action.modal;

    case HIDE_MODAL_SUCCESS:
      return action.modal;

    default:
      return state;
  }
};
