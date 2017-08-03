import { SHOW_ALERT_SUCCESS, HIDE_ALERT_SUCCESS } from './actionTypes';

export function showAlertSuccess(content, type) {
  return {
    type: SHOW_ALERT_SUCCESS,
    alert: {
      message: {
        content,
        type
      },
      show: true
    }
  };
}

export function hideAlertSuccess () {
  return {
    type: HIDE_ALERT_SUCCESS,
    alert: {
      message: {
        content: 'hide',
        type: ''
      },
      show: false
    }
  };
}

export function showAlert(content, type) {
  return dispatch => {
    dispatch(showAlertSuccess(content, type));
  };
}

export function hideAlert() {
  return dispatch => {
    dispatch(hideAlertSuccess());
  };
}
