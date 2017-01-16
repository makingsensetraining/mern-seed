import * as types from './actionTypes';
import * as endpoints from './apiEndpoints';
import fetch from 'isomorphic-fetch';

export function loadUserSuccess(users){
    return { type: types.LOAD_USER_SUCCESS, users: users };
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
