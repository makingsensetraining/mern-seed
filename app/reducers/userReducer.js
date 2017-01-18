import * as types from '../actions/actionTypes';
import initialState from './initialState';

export const userData = (state = initialState, action) => {
    switch (action.type){
        case types.LOAD_USER_SUCCESS:
            return Object.assign({}, state,
                {
                    users: action.users
                }
            );

        default:
            return state;
    }
};

export const user = (state = initialState.user, action) => {
    switch (action.type){
        case types.GET_USER_SUCCESS:
            return action.user;

        default:
            return state;
    }
};
