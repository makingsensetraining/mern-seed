import * as types from './actionTypes';
import userService from '../services/userService';

export function loadUserSuccess(users) {
    return {
        type: types.LOAD_USER_SUCCESS,
        users: users
    };
}

export function getUserSuccess(user) {
    return {
        type: types.GET_USER_SUCCESS,
        user
    };
}

export function createUserSuccess(user) {
    return {
        type: types.CREATE_USER_SUCCESS,
        user
    };
}

export function updateUserSuccess(user) {
    return {
        type: types.UPDATE_USER_SUCCESS,
        user
    };
}

export function deleteUserSuccess(userId) {
    return {
        type: types.DELETE_USER_SUCCESS,
        userId
    };
}

export function loadUsers() {
    return dispatch => {
        return userService.loadUsers()
            .then(data => dispatch(loadUserSuccess(data)));
    };
}

export function getUser(id) {
    return (dispatch, getState) => {
        return userService.getUser(id)
            .then(user => dispatch(getUserSuccess(user)));
    };
}

export function createUser(user) {
    return (dispatch, getState) => {
        return userService.createUser(user)
            .then(createdUser => dispatch(createUserSuccess(createdUser)));
    };
}

export function updateUser(user) {
    return (dispatch, getState) => {
        return userService.updateUser(user)
            .then(updatedUser => dispatch(updateUserSuccess(updatedUser)));
    };
}

export function deleteUser(id) {
    return (dispatch, getState) => {
        return userService.deleteUser(id)
            .then(() => dispatch(deleteUserSuccess(id)));
    };
}
