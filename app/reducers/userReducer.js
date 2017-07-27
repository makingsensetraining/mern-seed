import * as types from '../actions/actionTypes';
import initialState from './initialState';

export const users = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
      return Object.assign({}, state, {
        users: action.users
      });

    case types.CREATE_USER_SUCCESS:
      return Object.assign({}, state, {
        users: [
          ...state.users,
          Object.assign({}, action.user)
        ].sort((a, b) => {
          return a.id - b.id; // Sort by id alphabetically.
        })
      });

    case types.UPDATE_USER_SUCCESS:
      return Object.assign({}, state, {
        users: [
          ...state.users.filter(user => user.id !== action.user.id),
          Object.assign({}, action.user)
        ].sort((a, b) => {
          return a.id - b.id; // Sort by id alphabetically.
        })
      });

    case types.DELETE_USER_SUCCESS:
      return Object.assign({}, state, {
        users: [
          ...state.users.filter(user => user.id !== action.userId)
        ]
      });

    default:
      return state;
  }
};

export const user = (state = initialState.user, action) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return action.user;

    default:
      return state;
  }
};

export const alert = (state = initialState.alert, action) => {
  switch (action.type) {
    case types.SHOW_ALERT:
      return action.alert;

    case types.HIDE_ALERT:
      return action.alert;

    default:
      return state;
  }
};

export const saving = (state = initialState.saving, action) => {
  switch (action.type) {
    case types.SAVING_USER:
      return action.saving;

    case types.SAVE_USER_SUCCESS:
      return action.saving;

    case types.SAVE_USER_ERROR:
      return action.saving;

    default:
      return state;
  }
};

export const userToDelete = (state = initialState.userToDelete, action) => {
  switch (action.type) {
    case types.REQUEST_USER_ID:
      return action.userToDelete;

    default:
      return state;
  }
};

export const canSubmit = (state = initialState.canSubmit, action) => {
  switch (action.type) {
    case types.ENABLE_SUBMIT:
      return action.canSubmit;

    case types.DISABLE_SUBMIT:
      return action.canSubmit;

    default:
      return state;
  }
};
