import expect from 'expect';
import {users, user} from './userReducer';
import * as actions from '../actions/userActions';

describe('User Reducer', () => {
    it('should load the users when passed LOAD_USER_SUCCESS', () => {

        const initialStateUserData = []; //empty array

        const usersParam = [
            {
                id: 1,
                name: 'Test User 1',
                email: 'testuser1@makingsense.com',
                createdAt: '2017-01-20'
            },
            {
                id: 2,
                name: 'Test User 2',
                email: 'testuser2@makingsense.com',
                createdAt: '2017-01-20'
            }
        ];

        const action = actions.loadUserSuccess(usersParam);

        //act
        const newState = users(initialStateUserData, action);

        //assert
        expect(newState.users.length).toEqual(2);

        expect(newState.users[0].id).toEqual(1);
        expect(newState.users[0].name).toEqual('Test User 1');
        expect(newState.users[0].email).toEqual('testuser1@makingsense.com');
        expect(newState.users[0].createdAt).toEqual('2017-01-20');

        expect(newState.users[1].id).toEqual(2);
        expect(newState.users[1].name).toEqual('Test User 2');
        expect(newState.users[1].email).toEqual('testuser2@makingsense.com');
        expect(newState.users[1].createdAt).toEqual('2017-01-20');
    });

    it('should get the user when passed GET_USER_SUCCESS', () => {
        const initialStateUserObject = {}; //empty object

        const userParam = {
            id: 1,
            name: 'Test User 1',
            email: 'testuser1@makingsense.com',
            createdAt: '2017-01-20'
        };

        const action = actions.getUserSuccess(userParam);

        //act
        const newState = user(initialStateUserObject, action);

        //assert
        expect(newState.id).toEqual(1);
        expect(newState.name).toEqual('Test User 1');
        expect(newState.email).toEqual('testuser1@makingsense.com');
        expect(newState.createdAt).toEqual('2017-01-20');
    });
});
