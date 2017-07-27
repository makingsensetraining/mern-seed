import { push } from 'react-router-redux';
import * as types from './actionTypes';
import { showModal } from './modalActions';
import { showAlert, hideAlert } from './alertActions';
import userService from '../services/userService';

export function loadUserSuccess(users) {
  return {
    type: types.LOAD_USER_SUCCESS,
    users
  };
}

export function getUserSuccess(dispatch, user, showUserDetails = false) {
  dispatch({
    type: types.GET_USER_SUCCESS,
    user
  });

  if (showUserDetails) {
    showModal('userDetailsModal', dispatch);
  }
}

export function savingUser() {
  return {
    type : types.SAVING_USER,
    saving: true
  };
}

export function saveUserSuccess(dispatch, user, messageContent) {
  dispatch({
    type : types.SAVE_USER_SUCCESS,
    saving: false
  });
  showAlert(dispatch, messageContent, 'success');
  dispatch(push('/app/users'));
}

export function saveUserError(dispatch, user, error) {
  dispatch({
    type : types.SAVE_USER_ERROR,
    saving: false
  });
  showAlert(dispatch, error.description, 'error');
}

export function createUserSuccess(dispatch, user) {
  dispatch({
    type: types.CREATE_USER_SUCCESS,
    user
  });
  saveUserSuccess(dispatch, user, 'User created successfully');
}

export function updateUserSuccess(dispatch, user) {
  dispatch({
    type: types.UPDATE_USER_SUCCESS,
    user
  });
  saveUserSuccess(dispatch, user, 'User updated successfully');
}

export function requestUserId(userId) {
  return dispatch => {
    dispatch({
      type: types.REQUEST_USER_ID,
      userToDelete: userId
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

export function deleteUserSuccess(dispatch, userId) {
  dispatch({
    type: types.DELETE_USER_SUCCESS,
    userId
  });
  showAlert(dispatch, 'User removed', 'success');
}

export function loadUsers() {
  return dispatch => {
    hideAlert(dispatch);
    return userService.loadUsers()
      .then(data => dispatch(loadUserSuccess(data)))
      .catch(error => showAlert(dispatch, error.description, 'error'));
  };
}

export function getUser(id, showUserDetails = false) {
  return (dispatch, getState) => {
    hideAlert(dispatch);
    return userService.getUser(id)
      .then(user => getUserSuccess(dispatch, user, showUserDetails))
      .catch(error => showAlert(dispatch, error.description, 'error'));
  };
}

export function createUser(user) {
  return (dispatch, getState) => {
    hideAlert(dispatch);
    dispatch(savingUser());
    return userService.createUser(user)
      .then(createdUser => createUserSuccess(dispatch, createdUser))
      .catch(error => saveUserError(dispatch, user, error));
  };
}

export function updateUser(user) {
  return (dispatch, getState) => {
    hideAlert(dispatch);
    dispatch(savingUser());
    return userService.updateUser(user)
      .then(updatedUser => updateUserSuccess(dispatch, updatedUser))
      .catch(error => saveUserError(dispatch, user, error));
  };
}

export function deleteUser(id) {
  return (dispatch, getState) => {
    hideAlert(dispatch);
    return userService.deleteUser(id)
      .then(() => deleteUserSuccess(dispatch, id))
      .catch(error => showAlert(dispatch, error.description, 'error'));
  };
}
