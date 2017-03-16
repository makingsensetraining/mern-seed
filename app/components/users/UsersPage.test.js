import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {UsersPage} from './UsersPage'; //Using the undecorated component (In order to be able to test the component itself without having to deal with the decorator)

function setup() {
  const props = {
    actions: {
      loadUsers: () => { //This is a mock/spy of loadUsers function
        return Promise.resolve();
      }
    },
    users: [
      {
        id: 'some-id-1',
        name: 'Test User 1',
        email: 'testinguser@makingsense.com',
        createdAt: '2017-01-20'
      },
      {
        id: 'some-id-2',
        name: 'Test User 2',
        email: 'testinguser2@makingsense.com',
        createdAt: '2017-01-21'
      }
    ],
    user: {
      id: '',
      name: '',
      email: '',
      createdAt: ''
    }
  };

  return mount(<UsersPage {...props} />);
}

describe('Users Page', () => {

  it('Basic subcomponents rendering & count', () => {

    const wrapper = setup();

    expect(wrapper.find('h1').text()).toEqual('Users List'); //The h1 text should be Users List
    expect(wrapper.find('UserList').length).toEqual(1); //There has to be one UserList component.
    expect(wrapper.find('Modal').length).toEqual(1); //There has to be one Modal component.
    expect(wrapper.find('User').length).toEqual(2); //There has to be one User component.
  });
});
