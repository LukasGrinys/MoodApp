import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../NavBar';
import { items as navbarItems } from '../items';
import { mount } from 'enzyme';

const toggleNavMock = jest.fn();

const navbarProps = {
    isAuth: true,
    toggleNav: toggleNavMock
};

const wrapper = mount(
    <Router>
        <NavBar {...navbarProps}/>
    </Router>
);

test('Renders properly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('It has navigation items', () => {
    const authItems = navbarItems.filter( item => item.isAuth !== false );

    expect(wrapper.find('.navItem').length).toBe(authItems.length);
});

test('It has links to item', () => {
    const firstItem = navbarItems.find( item => item.isAuth !== false );
    const firstPath = firstItem.path;

    expect(wrapper.find('Link').at(0).prop('to')).toBe(firstPath);
});

test('It has a mask, covering page content', () => {
    expect(wrapper.find('.navBarMask').length).toBe(1);
});

test('It closes nav when clicked on mask', () => {
    wrapper.find('.navBarMask').simulate('click');

    expect(toggleNavMock).toHaveBeenCalledTimes(1);
});