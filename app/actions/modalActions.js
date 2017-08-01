import { SHOW_MODAL_SUCCESS, HIDE_MODAL_SUCCESS } from './actionTypes';

export function showModalSuccess(id) {
  return {
    type: SHOW_MODAL_SUCCESS,
    modal: {
      id,
      show: true
    }
  };
}

export function hideModalSuccess(id) {
  return {
    type: HIDE_MODAL_SUCCESS,
    modal: {
      id,
      show: false
    }
  };
}

export function showModal(id) {
  return dispatch => {
    dispatch(showModalSuccess(id));
  };
}

export function hideModal(id) {
  return dispatch => {
    dispatch(hideModalSuccess(id));
  };
}
