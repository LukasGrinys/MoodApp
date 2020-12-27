import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MoodStatus from '../MoodStatus';
import LoadingNetItem from '../../Loading/loadingNetItem';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { routerRoutes } from '../../../constants/routerRoutes';
import { testLogs } from '../../../../__mocks__/logsMock';

const mockStore = configureStore();

describe('MoodStatus: loading', () => {
    const initialState = {
        user: {},
        logs: {
            lastLogs : {
                isFetching: true,
                logs: null
            }
        }
    }

    const store = mockStore(initialState);

    const wrapper = mount(
        <Provider store={store}>
            <MoodStatus/>
        </Provider>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Renders loading widget', () => {
        expect(wrapper.find(LoadingNetItem).length).toBe(1);
    })
});

describe('MoodStatus without any logs', () => {
    const store = mockStore({
        user: {},
        logs: {
            lastLogs : {
                isFetching: false,
                logs: []
            }
        }
    });

    const wrapper = mount(
        <Router>
            <Provider store={store}>
                <MoodStatus/>
            </Provider>
        </Router>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Has a status box', () => {
        expect(wrapper.find('.statusBox').length).toBe(1);
    });

    test('Status box shows N/A instead of rating', () => {
        expect(wrapper.find('.statusBox').text()).toBe('N/A');
    });

    test('Has a link to stats section', () => {
        expect(wrapper.find('Link').length).toBe(1);
        expect(wrapper.find('Link').prop('to')).toBe(routerRoutes.stats);
    });
});

describe('MoodStatus with logs', () => {
    const store = mockStore({
        user: {},
        logs: {
            lastLogs : {
                isFetching: false,
                logs: testLogs
            }
        }
    });

    const wrapper = mount(
        <Router>
            <Provider store={store}>
                <MoodStatus/>
            </Provider>
        </Router>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Has a status box', () => {
        expect(wrapper.find('.statusBox').length).toBe(1);
    });

    test('Status box shows rating', () => {
        /* Here at component level we assume that average of
        test logs is 9 for now */;
        expect(wrapper.find('.statusBox').text()).toBe('9.0');
    });

    test('Has a status text', () => {
        /* This test already indicates that we should export the
        text generating function as a helper */
        expect(wrapper.find('.statusText').length).toBe(1);
        expect(wrapper.find('.statusText').text()).toBe('Great');
    })

    test('Has a link to stats section', () => {
        expect(wrapper.find('Link').length).toBe(1);
        expect(wrapper.find('Link').prop('to')).toBe(routerRoutes.stats);
    });
});

