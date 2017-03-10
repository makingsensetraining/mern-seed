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
