import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import HomePage from './HomePage';

function setup(){
  return shallow(<HomePage />);
}

describe('HomePage', () => {
  it('renders homepage, h1 and subtitle', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('MERN seed App');
    expect(wrapper.find('p').text()).toEqual('MongoDB, ExpressJS, React, Node using Redux in ES6 for ultra-responsive webapps.');
  });
});
