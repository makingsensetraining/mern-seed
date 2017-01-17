import * as types from './actionTypes';
import * as endpoints from './apiEndpoints';
import fetch from 'isomorphic-fetch';

export function loadUserSuccess(users){
    return { type: types.LOAD_USER_SUCCESS, users: users };
}

export function getUserSuccess(user){
    return { type: types.GET_USER_SUCCESS, user };
}

export function loadUsers(){
    return dispatch => {

        return fetch(endpoints.GET_USERS)
            .then(response => response.json())
            .then(data => dispatch(loadUserSuccess(data)))
            .catch(error => {
                throw(error);
            });
    };
}

export function getUser(id){
    return (dispatch, getState) => {
        const url = endpoints.GET_USER + `/${id}`;

        return fetch(url)
            .then(response => response.json())
            .then(user => dispatch(getUserSuccess(user)))
            .catch(error => {
                throw(error);
            });
    };
}
