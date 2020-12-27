import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LogoutItem from '../LogoutItem';
import { mount } from 'enzyme';
import { routerRoutes } from '../../../constants/routerRoutes';

const wrapper = mount(
    <Router>
        <LogoutItem/>
    </Router>
)

test('Renders properly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Has logout icon', () => {
    const icon = wrapper.find('FontAwesome');

    expect(icon.length).toBe(1);
    expect(icon.props()).toEqual({
        className: 'logoutIcon',
        name: 'sign-out'
    })
});

test('Has a link to logout page', () => {
    const link = wrapper.find('Link');
    
    expect(link.length).toBe(1);
    expect(link.prop('to')).toBe(routerRoutes.logout);
})