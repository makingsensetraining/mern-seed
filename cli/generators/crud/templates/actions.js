import { push } from 'react-router-redux';
import * as types from './actionTypes';
import { showModalSuccess } from './modalActions';
import { showAlertSuccess, hideAlertSuccess } from './alertActions';
import <%= name %>Service from '../services/<%= name %>Service';

export function load<%= ucName %>Success(<%= pluralizedName %>) {
  return {
    type: types.LOAD_<%= name.toUpperCase() %>_SUCCESS,
    <%= pluralizedName %>
  };
}

export function get<%= ucName %>Success(<%= name %>) {
  return {
    type: types.GET_<%= name.toUpperCase() %>_SUCCESS,
    <%= name %>
  };
}

export function saving<%= ucName %>(status = true) {
  return {
    type : types.SAVING_<%= name.toUpperCase() %>,
    saving<%= ucName %>: status
  };
}

export function create<%= ucName %>Success(<%= name %>) {
  return {
    type: types.CREATE_<%= name.toUpperCase() %>_SUCCESS,
    <%= name %>
  };
}

export function update<%= ucName %>Success(<%= name %>) {
  return {
    type: types.UPDATE_<%= name.toUpperCase() %>_SUCCESS,
    <%= name %>
  };
}

export function request<%= ucName %>Id(<%= name %>Id) {
  return dispatch => {
    dispatch({
      type: types.REQUEST_<%= name.toUpperCase() %>_ID,
      <%= name %>ToDelete:  <%= name %>Id
    });
    dispatch(showModalSuccess('<%= name %>DeleteModal'));
  };
}

export function enableSubmit<%= ucName %>() {
  return dispatch => {
    dispatch({
      type: types.ENABLE_SUBMIT_<%= name.toUpperCase() %>,
      canSubmit<%= ucName %>: true
    });
  };
}

export function disableSubmit<%= ucName %>() {
  return dispatch => {
    dispatch({
      type: types.DISABLE_SUBMIT_<%= name.toUpperCase() %>,
      canSubmit<%= ucName %>: false
    });
  };
}

export function delete<%= ucName %>Success(<%= name %>Id) {
  return {
    type: types.DELETE_<%= name.toUpperCase() %>_SUCCESS,
    <%= name %>Id
  };
}

export function load<%= pluralizedUcName %>() {
  return dispatch => {
    dispatch(hideAlertSuccess());
    return <%= name %>Service.load<%= pluralizedUcName %>()
      .then(data => dispatch(load<%= ucName %>Success(data)))
      .catch(error => dispatch(showAlertSuccess(error.description, 'error')));
  };
}

export function get<%= ucName %>(id, show<%= name.toUpperCase() %>Details = false) {
  return (dispatch, getState) => {
    dispatch(hideAlertSuccess());
    return <%= name %>Service.get<%= ucName %>(id)
      .then(<%= name %> => {
        dispatch(get<%= ucName %>Success(<%= name %>));
        if (show<%= name.toUpperCase() %>Details) {
          dispatch(showModalSuccess('<%= name %>DetailsModal'));
        }
      })
      .catch(error => dispatch(showAlertSuccess(error.description, 'error')));
  };
}

export function create<%= ucName %>(<%= name %>) {
  return (dispatch, getState) => {
    dispatch(hideAlertSuccess());
    dispatch(saving<%= ucName %>());
    return <%= name %>Service.create<%= ucName %>(<%= name %>)
      .then(created<%= ucName %> => {
        dispatch(create<%= ucName %>Success(created<%= ucName %>));
        dispatch(saving<%= ucName %>(false));
        dispatch(showAlertSuccess('<%= ucName %> created successfully', 'success'));
        dispatch(push('/app/<%= pluralizedName %>'));
      })
      .catch(error => {
        dispatch(saving<%= ucName %>(false));
        dispatch(showAlertSuccess(error.description, 'error'));
      });
  };
}

export function update<%= ucName %>(<%= name %>) {
  return (dispatch, getState) => {
    dispatch(hideAlertSuccess());
    dispatch(saving<%= ucName %>());
    return <%= name %>Service.update<%= ucName %>(<%= name %>)
      .then(updated<%= ucName %> => {
        dispatch(update<%= ucName %>Success(updated<%= ucName %>));
        dispatch(saving<%= ucName %>(false));
        dispatch(showAlertSuccess('<%= ucName %> updated successfully', 'success'));
        dispatch(push('/app/<%= pluralizedName %>'));
      })
      .catch(error => {
        dispatch(saving<%= ucName %>(false));
        dispatch(showAlertSuccess(error.description, 'error'));
      });
  };
}

export function delete<%= ucName %>(id) {
  return (dispatch, getState) => {
    dispatch(hideAlertSuccess());
    return <%= name %>Service.delete<%= ucName %>(id)
      .then(() => {
        dispatch(delete<%= ucName %>Success(id));
        dispatch(showAlertSuccess('<%= ucName %> removed', 'success'));
      })
      .catch(error => dispatch(showAlertSuccess(error.description, 'error')));
  };
}
