import { SHOW_MODAL, HIDE_MODAL } from './actionTypes';

export function showModal(id, dispatcher = null) {
  const modalActionType = {
    type: SHOW_MODAL,
    modal: {
      id,
      show: true
    }
  };

  if (!dispatcher) {
    return dispatch => {
      dispatch(modalActionType);
    };
  }

  dispatcher(modalActionType);
}

export function hideModal(id, dispatcher = null) {
  const modalActionType = {
    type: HIDE_MODAL,
    modal: {
      id,
      show: false
    }
  };

  if (!dispatcher) {
    return dispatch => {
      dispatch(modalActionType);
    };
  }

  dispatcher(modalActionType);
}
