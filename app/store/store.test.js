import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as userActions from '../actions/userActions';

describe('Store', () => {
  it('Should handle loading users', () => {
    //arrange
    const store = createStore(rootReducer, initialState);

    const users = [
      {
        id: 1,
        name: 'Test User 1',
        email: 'testuser@makingsense.com',
        createdAt: '2017-01-17'
      },
      {
        id: 2,
        name: 'Test User 2',
        email: 'testuser2@makingsense.com',
        createdAt: '2017-01-17'
      },
      {
        id: 3,
        name: 'Test User 3',
        email: 'testuser3@makingsense.com',
        createdAt: '2017-01-17'
      }
    ];

    //act
    const action = userActions.loadUserSuccess(users);
    store.dispatch(action);

    //assert
    const actual = store.getState().users.users;

    expect(actual).toEqual(users);
    expect(actual.length).toEqual(3);
  });
});
