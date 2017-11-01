import { users, user } from './userReducer';
import * as actions from '../actions/userActions';
import * as actionTypes from '../actions/actionTypes';

describe('User Reducer', () => {
  it(`should load the users when passed ${actionTypes.LOAD_USER_SUCCESS}`, () => {
    // Arrange.
    const initialState = { users: [] };
    const user1 = {
      id: 1,
      name: 'Test User 1',
      email: 'testuser1@makingsense.com',
      createdAt: '2017-01-20'
    };
    const user2 = {
      id: 2,
      name: 'Test User 2',
      email: 'testuser2@makingsense.com',
      createdAt: '2017-01-20'
    };

    const action = actions.loadUserSuccess([user1, user2]);

    // Act.
    const newState = users(initialState, action);

    // Assert.
    expect(newState.users.length).toEqual(2);

    expect(newState.users[0].id).toEqual(user1.id);
    expect(newState.users[0].name).toEqual(user1.name);
    expect(newState.users[0].email).toEqual(user1.email);
    expect(newState.users[0].createdAt).toEqual(user1.createdAt);

    expect(newState.users[1].id).toEqual(user2.id);
    expect(newState.users[1].name).toEqual(user2.name);
    expect(newState.users[1].email).toEqual(user2.email);
    expect(newState.users[1].createdAt).toEqual(user2.createdAt);
  });

  it(`should get the user when passed ${actionTypes.GET_USER_SUCCESS}`, () => {
    // Arrange.
    const initialState = { user: {} };
    const user1 = {
      id: 1,
      name: 'Test User 1',
      email: 'testuser1@makingsense.com',
      createdAt: '2017-01-20'
    };

    const action = actions.getUserSuccess(user1);

    // Act.
    const newState = user(initialState, action);

    // Assert.
    expect(newState.id).toEqual(user1.id);
    expect(newState.name).toEqual(user1.name);
    expect(newState.email).toEqual(user1.email);
    expect(newState.createdAt).toEqual(user1.createdAt);
  });

  it(`should add a user when passed ${actionTypes.CREATE_USER_SUCCESS}`, () => {
    // Arrange.
    const initialState = { users: [] };
    const user1 = {
      id: 1,
      name: 'Test User 1',
      email: 'testuser1@makingsense.com',
      createdAt: '2017-01-20'
    };

    const action = actions.createUserSuccess(user1);

    // Act.
    const newState = users(initialState, action);

    // Assert.
    expect(newState.users.length).toEqual(1);

    expect(newState.users[0].id).toEqual(user1.id);
    expect(newState.users[0].name).toEqual(user1.name);
    expect(newState.users[0].email).toEqual(user1.email);
    expect(newState.users[0].createdAt).toEqual(user1.createdAt);
  });

  it(`should update a user when passed ${actionTypes.UPDATE_USER_SUCCESS}`, () => {
    // Arrange.
    const initialState = { users: [{ id: 1, name: 'test', email: 'test@test.com', createdAt: '0000-00-00' }] };
    const user1 = {
      id: 1,
      name: 'Test User 1',
      email: 'testuser1@makingsense.com',
      createdAt: '2017-01-20'
    };

    const action = actions.updateUserSuccess(user1);

    // Act.
    const newState = users(initialState, action);

    // Assert.
    expect(newState.users.length).toEqual(1);

    expect(newState.users[0].id).toEqual(user1.id);
    expect(newState.users[0].name).toEqual(user1.name);
    expect(newState.users[0].email).toEqual(user1.email);
    expect(newState.users[0].createdAt).toEqual(user1.createdAt);
  });

  it(`should delete a user when passed ${actionTypes.DELETE_USER_SUCCESS}`, () => {
    // Arrange.
    const userIdToDelete = 1;
    const initialState = { users: [{ id: userIdToDelete, name: 'test', email: 'test@test.com', createdAt: '0000-00-00' }] };

    const action = actions.deleteUserSuccess(userIdToDelete);

    // Act.
    const newState = users(initialState, action);

    // Assert.
    expect(newState.users.length).toEqual(0);
  });
});
