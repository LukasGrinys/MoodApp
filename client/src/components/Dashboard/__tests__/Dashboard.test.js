import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Loading from '../../Loading/loading';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import LastLogs from '../LastLogs';
import MoodStatus from '../MoodStatus';
import SettingsItem from '../SettingsItem';
import LogoutItem from '../LogoutItem';

const mockStore = configureStore();

describe('Dashboard: loading', () => {
    const store = mockStore({
        user: {
            isAuth : null
        },
        logs: {
            lastLogs : {
                isFetching: true,
                logs: null
            }
        }
    });

    const wrapper = mount(
        <Provider store={store}>
            <Dashboard/>
        </Provider>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Has loading widget', () => {
        expect(wrapper.find(Loading).length).toBe(1);
    })
});

describe('Dashboard when loaded', () => {
    const store = mockStore({
        user: {
            isAuth : true
        },
        logs: {
            canLog: true,
            lastLogs : {
                isFetching: false,
                logs: []
            }
        }
    });

    const wrapper = mount(
        <Router>
            <Provider store={store}>
                <Dashboard/>
            </Provider>
        </Router>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Has LastLogs item', () => {
        expect(wrapper.find(LastLogs).length).toBe(1);
    });

    test('Has MoodStatus item', () => {
        expect(wrapper.find(MoodStatus).length).toBe(1);
    });

    test('Has SettingsItem item', () => {
        expect(wrapper.find(SettingsItem).length).toBe(1);
    });

    test('Has Logout item', () => {
        expect(wrapper.find(LogoutItem).length).toBe(1);
    });
});