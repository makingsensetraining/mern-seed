import expect from 'expect';
import * as userActions from './userActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('should creates LOAD_USER_SUCCESS when fetching users has been done', () => {
        //Here and example call to nock (mocking HTTP); -> mock/spy
        nock('http://localhost:3000/api/users/')
            .get('')
            .reply(200, { body:  [
                {
                    id: 1,
                    name: "User Name 1",
                    email: "user-email-name1@test.com",
                    createdAt: "2016-12-29"
                },
                {
                    id: 2,
                    name: "User Name 2",
                    email: "user-email-name2@test.com",
                    createdAt: "2016-12-29"
                },
                {
                    id: 3,
                    name: "User Name 3",
                    email: "user-email-name3@test.com",
                    createdAt: "2016-12-29"
                }
            ]


            });

        const expectedActions = [
            { type: types.LOAD_USER_SUCCESS,
                users: {
                    body: [
                        {
                            id: 1,
                            name: "User Name 1",
                            email: "user-email-name1@test.com",
                            createdAt: "2016-12-29"
                        },
                        {
                            id: 2,
                            name: "User Name 2",
                            email: "user-email-name2@test.com",
                            createdAt: "2016-12-29"
                        },
                        {
                            id: 3,
                            name: "User Name 3",
                            email: "user-email-name3@test.com",
                            createdAt: "2016-12-29"
                        }
                    ]
                }}
        ];

        const store = mockStore({ users: [] }, expectedActions);

        return store.dispatch(userActions.loadUsers())
            .then(() => { //return of async actions
                const actions = store.getActions();

                expect(actions[0].type).toEqual(types.LOAD_USER_SUCCESS);
                expect(actions[0].users).toEqual(expectedActions[0].users);
            });
    });

    it('should creates GET_USER_SUCCESS when fetching a user (with a particular id) has been done', () => {
        const idUser = 1;
        //Here and example call to nock (mocking HTTP); -> mock/spy
        nock(`http://localhost:3000/api/users/${idUser}`)
            .get('')
            .reply(200, { body:
                {
                    id: 1,
                    name: "User Name 1",
                    email: "user-email-name1@test.com",
                    createdAt: "2016-12-29"
                }
            });

        const expectedActions = [
            { type: types.GET_USER_SUCCESS,
                    body: {
                        id: 1,
                        name: "User Name 1",
                        email: "user-email-name1@test.com",
                        createdAt: "2016-12-29"
                    }
            }
        ];

        const store = mockStore({ users: [] }, expectedActions);

        return store.dispatch(userActions.getUser(idUser))
            .then(() => { //return of async actions
                const actions = store.getActions();

                expect(actions[0].type).toEqual(types.GET_USER_SUCCESS);
                expect(actions[0].user.body).toEqual(expectedActions[0].body);
            });
    });
});

