import { push } from 'react-router-redux';
import * as types from './actionTypes';
import <%= name %>Service from '../services/<%= name %>Service';

export function showAlert(dispatch, content, type) {
  dispatch({
    type: types.SHOW_ALERT,
    alert: {
      message: {
        content,
        type,
      }
      show: true
    }
  });
}

export function hideAlert(dispatch) {
  dispatch({
    type: types.HIDE_ALERT,
    alert: {
      message: {
        content: 'hide',
        type: ''
      },
      show: false
    }
  });
}

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

export function create<%= ucName %>Success(dispatch, <%= name %>) {
  dispatch({
    type: types.CREATE_<%= name.toUpperCase() %>_SUCCESS,
    <%= name %>
  });
  save<%= ucName %>Success(dispatch, <%= name %>, '<%= ucName %> created successfully');
}

export function update<%= ucName %>Success(dispatch, <%= name %>) {
  dispatch({
    type: types.UPDATE_<%= name.toUpperCase() %>_SUCCESS,
    <%= name %>
  });
  save<%= ucName %>Success(dispatch, <%= name %>, '<%= ucName %> updated successfully');
}

export function request<%= ucName %>Id(<%= name %>Id) {
  return dispatch => {
    dispatch({
      type: types.REQUEST_<%= name.toUpperCase() %>_ID,
      <%= name %>ToDelete:  <%= name %>Id
    });
  };
}

export function enableSubmit() {
  return dispatch => {
    dispatch({
      type: types.ENABLE_SUBMIT,
      canSubmit: true
    });
  };
}

export function disableSubmit() {
  return dispatch => {
    dispatch({
      type: types.DISABLE_SUBMIT,
      canSubmit: false
    });
  };
}

export function saving<%= ucName %>() {
  return {
    type : types.SAVING_<%= name.toUpperCase() %>,
    saving: true
  };
}

export function save<%= ucName %>Success(dispatch, messageContent) {
  dispatch({
    type : types.SAVE_<%= name.toUpperCase() %>_SUCCESS,
    saving: false
  });
  showAlert(dispatch, messageContent, 'success');
  dispatch(push('/app/<%= pluralizedName %>'));
}

export function save<%= ucName %>Error(dispatch, error) {
  dispatch({
    type : types.SAVE_<%= name.toUpperCase() %>_ERROR,
    saving: false
  });
  showAlert(dispatch, error.description, 'error');
}

export function delete<%= ucName %>Success(dispatch, <%= name %>Id) {
  dispatch({
    type: types.DELETE_<%= name.toUpperCase() %>_SUCCESS,
    <%= name %>Id
  });
  showAlert(dispatch, '<%= ucName %> removed', 'success');
}

export function load<%= pluralizedUcName %>() {
  return dispatch => {
    hideAlert(dispatch);
    return <%= name %>Service.load<%= pluralizedUcName %>()
      .then(data => dispatch(load<%= ucName %>Success(data)))
      .catch(error => showAlert(dispatch, error.description, 'error'));
  };
}

export function get<%= ucName %>(id) {
  return (dispatch, getState) => {
    hideAlert(dispatch);
    return <%= name %>Service.get<%= ucName %>(id)
      .then(<%= name %> => dispatch(get<%= ucName %>Success(<%= name %>)))
      .catch(error => showAlert(dispatch, error.description, 'error'));
  };
}

export function create<%= ucName %>(<%= name %>) {
  return (dispatch, getState) => {
    hideAlert(dispatch);
    dispatch(saving<%= ucName %>());
    return <%= name %>Service.create<%= ucName %>(<%= name %>)
      .then(created<%= ucName %> => create<%= ucName %>Success(dispatch, created<%= ucName %>))
      .catch(error => save<%= ucName %>Error(dispatch, <%= name %>, error));
  };
}

export function update<%= ucName %>(<%= name %>) {
  return (dispatch, getState) => {
    hideAlert(dispatch);
    dispatch(saving<%= ucName %>());
    return <%= name %>Service.update<%= ucName %>(<%= name %>)
      .then(updated<%= ucName %> => update<%= ucName %>Success(dispatch, updated<%= ucName %>))
      .catch(error => save<%= ucName %>Error(dispatch, <%= name %>, error));
  };
}

export function delete<%= ucName %>(id) {
  return (dispatch, getState) => {
    hideAlert(dispatch);
    return <%= name %>Service.delete<%= ucName %>(id)
      .then(() => delete<%= ucName %>Success(dispatch, id))
      .catch(error => showAlert(dispatch, error.description, 'error'));
  };
}
