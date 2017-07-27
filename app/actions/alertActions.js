import { SHOW_ALERT, HIDE_ALERT } from './actionTypes';

export function showAlert(dispatch, content, type) {
  dispatch({
    type: SHOW_ALERT,
    alert: {
      message: {
        content,
        type
      },
      show: true
    }
  });
}

export function hideAlert(dispatch) {
  dispatch({
    type: HIDE_ALERT,
    alert: {
      message: {
        content: 'hide',
        type: ''
      },
      show: false
    }
  });
}
