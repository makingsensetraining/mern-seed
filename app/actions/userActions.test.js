import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

import * as endpoints from '../services/apiEndpoints';
import * as userActions from './userActions';
import * as types from './actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('User Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it(`should dispatch ${types.LOAD_USER_SUCCESS} when fetching users`, () => {
    const users = [
      {
        id: 1,
        name: 'User Name 1',
        email: 'user-email-name1@test.com',
        createdAt: '2016-12-29'
      },
      {
        id: 2,
        name: 'User Name 2',
        email: 'user-email-name2@test.com',
        createdAt: '2016-12-29'
      },
      {
        id: 3,
        name: 'User Name 3',
        email: 'user-email-name3@test.com',
        createdAt: '2016-12-29'
      }
    ];

    const alert = {
      message: {
        content: 'hide',
          type: ''
      },
      show: false
    };

    nock(endpoints.BASE_URL)
      .get(`${endpoints.GET_USERS}`)
      .reply(200, users);

    const expectedActions = [
      {
        type: types.HIDE_ALERT_SUCCESS,
        alert,
      },
      {
        type: types.LOAD_USER_SUCCESS,
        users
      }
    ];

    const store = mockStore({
      users: [],
      alert: {
        message : {
          content : '',
          type    : '',
        },
        show: false
      }
    }, expectedActions);

    return store.dispatch(userActions.loadUsers())
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toEqual(types.HIDE_ALERT_SUCCESS);
        expect(actions[0].alert).toEqual(expectedActions[0].alert);

        expect(actions[1].type).toEqual(types.LOAD_USER_SUCCESS);
        expect(actions[1].users).toEqual(expectedActions[1].users);
      });
  });

  it(`should dispatch ${types.GET_USER_SUCCESS} when fetching a user (with a particular id)`, () => {
    const user = {
      id: 1,
      name: 'User Name 1',
      email: 'user-email-name1@test.com',
      createdAt: '2016-12-29'
    };

    const alert = {
      message: {
        content: 'hide',
        type: ''
      },
      show: false
    };

    nock(endpoints.BASE_URL)
      .get(`${endpoints.GET_USER}/${user.id}`)
      .reply(200, user);

    const expectedActions = [
      {
        type: types.HIDE_ALERT_SUCCESS,
        alert
      },
      {
        type: types.GET_USER_SUCCESS,
        user
      }
    ];

    const store = mockStore({
      users: [],
      alert: {
        message : {
          content : '',
          type    : '',
        },
        show: false
      }
    }, expectedActions);

    return store.dispatch(userActions.getUser(user.id))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toEqual(types.HIDE_ALERT_SUCCESS);
        expect(actions[0].alert).toEqual(expectedActions[0].alert);

        expect(actions[1].type).toEqual(types.GET_USER_SUCCESS);
        expect(actions[1].user).toEqual(expectedActions[1].user);
      });
  });

  it(`should dispatch ${types.CREATE_USER_SUCCESS} when creating a user`, () => {
    const user = {
      id: 99,
      name: 'User Name 1',
      email: 'user-email-name1@test.com',
      createdAt: '2016-12-29'
    };

    const alertHide = {
      message: {
        content: 'hide',
        type: ''
      },
      show: false
    };

    const alertShow = {
      message: {
        content: 'User created successfully',
        type: 'success'
      },
      show: true
    };

    nock(endpoints.BASE_URL)
      .post(endpoints.POST_USER, { user: user })
      .reply(200, user);

    const expectedActions = [
      {
        type: types.HIDE_ALERT_SUCCESS,
        alert : alertHide
      },
      {
        type: types.SAVING_USER,
        savingUser: true,
      },
      {
        type: types.CREATE_USER_SUCCESS,
        user
      },
      {
        type: types.SAVING_USER,
        savingUser: false,
      },
      {
        type: types.SHOW_ALERT_SUCCESS,
        alert: alertShow
      }
    ];

    const store = mockStore({
      users: [],
      savingUser: false,
      alert: {
        message : {
          content : '',
          type    : '',
        },
        show: false
      }
    }, expectedActions);

    return store.dispatch(userActions.createUser(user))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toEqual(types.HIDE_ALERT_SUCCESS);
        expect(actions[0].alert).toEqual(expectedActions[0].alert);

        expect(actions[1].type).toEqual(types.SAVING_USER);
        expect(actions[1].savingUser).toEqual(expectedActions[1].savingUser);

        expect(actions[2].type).toEqual(types.CREATE_USER_SUCCESS);
        expect(actions[2].user).toEqual(expectedActions[2].user);

        expect(actions[3].type).toEqual(types.SAVING_USER);
        expect(actions[3].savingUser).toEqual(expectedActions[3].savingUser);

        expect(actions[4].type).toEqual(types.SHOW_ALERT_SUCCESS);
        expect(actions[4].alert).toEqual(expectedActions[4].alert);
      });
  });

  it(`should dispatch ${types.UPDATE_USER_SUCCESS} when updating a user`, () => {
    const user = {
      id: 99,
      name: 'User Name 1',
      email: 'user-email-name1@test.com',
      createdAt: '2016-12-29'
    };

    const alertHide = {
      message: {
        content: 'hide',
        type: ''
      },
      show: false
    };

    const alertShow = {
      message: {
        content: 'User updated successfully',
        type: 'success'
      },
      show: true
    };

    nock(endpoints.BASE_URL)
      .put(`${endpoints.PUT_USER}/${user.id}`, { user: user })
      .reply(200, user);

    const expectedActions = [
      {
        type: types.HIDE_ALERT_SUCCESS,
        alert : alertHide
      },
      {
        type: types.SAVING_USER,
        savingUser: true,
      },
      {
        type: types.UPDATE_USER_SUCCESS,
        user
      },
      {
        type: types.SAVING_USER,
        savingUser: false,
      },
      {
        type: types.SHOW_ALERT_SUCCESS,
        alert: alertShow
      }
    ];

    const store = mockStore({
      users: [
        {
          id: 99,
          name: 'Test',
          email: 'test@test.com',
          createdAt: '0000-00-00'
        }
      ],
      alert: {
        message : {
          content : '',
          type    : '',
        },
        show: false
      }
    }, expectedActions);

    return store.dispatch(userActions.updateUser(user))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.HIDE_ALERT_SUCCESS);
        expect(actions[0].alert).toEqual(expectedActions[0].alert);

        expect(actions[1].type).toEqual(types.SAVING_USER);
        expect(actions[1].savingUser).toEqual(expectedActions[1].savingUser);

        expect(actions[2].type).toEqual(types.UPDATE_USER_SUCCESS);
        expect(actions[2].user).toEqual(expectedActions[2].user);

        expect(actions[3].type).toEqual(types.SAVING_USER);
        expect(actions[3].savingUser).toEqual(expectedActions[3].savingUser);

        expect(actions[4].type).toEqual(types.SHOW_ALERT_SUCCESS);
        expect(actions[4].alert).toEqual(expectedActions[4].alert);
      });
  });

  it(`should dispatch ${types.DELETE_USER_SUCCESS} when deleting a user`, () => {
    const userId = 99;
    nock(endpoints.BASE_URL)
      .delete(`${endpoints.DELETE_USER}/${userId}`)
      .reply(200, userId);

    const alertHide = {
      message: {
        content: 'hide',
        type: ''
      },
      show: false
    };

    const alertShow = {
      message: {
        content: 'User removed',
        type: 'success'
      },
      show: true
    };

    const expectedActions = [
      {
        type: types.HIDE_ALERT_SUCCESS,
        alert: alertHide
      },
      {
        type: types.DELETE_USER_SUCCESS,
        userId
      },
      {
        type: types.SHOW_ALERT_SUCCESS,
        alert: alertShow
      }
    ];

    const store = mockStore({
      users: [
        {
          id: 99,
          name: 'Test',
          email: 'test@test.com',
          createdAt: '0000-00-00'
        },
      ],
      alert: {
        message : {
          content : '',
          type    : '',
        },
        show: false
      }
    }, expectedActions);

    return store.dispatch(userActions.deleteUser(userId))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.HIDE_ALERT_SUCCESS);
        expect(actions[0].alert).toEqual(expectedActions[0].alert);

        expect(actions[1].type).toEqual(types.DELETE_USER_SUCCESS);
        expect(actions[1].userId).toEqual(expectedActions[1].userId);

        expect(actions[2].type).toEqual(types.SHOW_ALERT_SUCCESS);
        expect(actions[2].alert).toEqual(expectedActions[2].alert);
      });
  });
});
