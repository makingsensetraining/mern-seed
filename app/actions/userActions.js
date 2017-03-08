import * as types from './actionTypes';
import userApi from '../api/userApi';

export function loadUserSuccess(users) {
    return {type: types.LOAD_USER_SUCCESS, users: users};
}

export function getUserSuccess(user) {
    return {type: types.GET_USER_SUCCESS, user};
}

export function loadUsers() {
    return dispatch => {
        return userApi.loadUsers()
            .then(data => dispatch(loadUserSuccess(data)))
            .catch(error => {
                throw(error);
            });
    };
}

export function getUser(id) {
    return (dispatch, getState) => {
        return userApi.getUser(id)
            .then(user => dispatch(getUserSuccess(user)))
            .catch(error => {
                throw(error);
            });
    };
}
