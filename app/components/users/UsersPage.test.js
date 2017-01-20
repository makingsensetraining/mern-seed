import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
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
                id: 1,
                name: 'Test User 1',
                email: 'testinguser@makingsense.com',
                createdAt: '2017-01-20'
            }
        ],
        user: {
            id: 0,
            name: '',
            email: '',
            createdAt: ''
        }
    };

    return shallow(<UsersPage {...props} />);
}

describe('Users Page', () => {

    it('show a modal when clicking on some user', () => {

        const wrapper = setup();

        expect(wrapper.find('h1').text()).toEqual('Users List');

        //ToDo: continue here the test

        // console.log(wrapper.find(''));

        //actions??
        //const saveButton = wrapper.find('input').last();
        //expect(saveButton.prop('type')).toBe('submit');
        //saveButton.simulate('click');
        //expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
    });
});
