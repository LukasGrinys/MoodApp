import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SettingsItem from '../SettingsItem';
import { mount } from 'enzyme';
import { routerRoutes } from '../../../constants/routerRoutes';

const wrapper = mount(
    <Router>
        <SettingsItem/>
    </Router>
)

test('Renders properly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Has settings icon (Cog)', () => {
    const icon = wrapper.find('FontAwesome');

    expect(icon.length).toBe(1);
    expect(icon.props()).toEqual({
        className: 'settingsIcon',
        name: 'cog'
    })
});

test('Has a link to settings page', () => {
    const link = wrapper.find('Link');
    
    expect(link.length).toBe(1);
    expect(link.prop('to')).toBe(routerRoutes.settings);
})