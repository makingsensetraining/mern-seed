import * as types from './actionTypes';
import userService from '../services/userService';

export function loadUserSuccess(users) {
    return {type: types.LOAD_USER_SUCCESS, users: users};
}

export function getUserSuccess(user) {
    return {type: types.GET_USER_SUCCESS, user};
}

export function loadUsers() {
    return dispatch => {
        return userService.loadUsers()
            .then(data => dispatch(loadUserSuccess(data)))
            .catch(error => {
                throw(error);
            });
    };
}

export function getUser(id) {
    return (dispatch, getState) => {
        return userService.getUser(id)
            .then(user => dispatch(getUserSuccess(user)))
            .catch(error => {
                throw(error);
            });
    };
}
