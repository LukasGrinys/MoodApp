import React from 'react';
import Stats from '../Stats';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { testLogs } from '../../../../__mocks__/logsMock';

const mockStore = configureStore();
const mockDispatch = jest.fn();

jest.mock("react-redux", () => {
    const { Provider, useSelector } = jest.requireActual("react-redux");
  
    return {
        useDispatch: () => mockDispatch,
        useSelector,
        Provider
    };
});

const testId = 'testId';

describe('Stats: loading data', () => {
    const store = mockStore({
        user: {
            userData: {
                id: testId
            }
        },
        logs: {
            allLogs: {
                logs: [],
                isFetching: true,
                error: null
            }
        }
    });

    const wrapper = mount(
        <Provider store={store}>
            <Stats/>
        </Provider>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Has loading widget', () => {
        expect(wrapper.find('Loading').length).toBe(1);
    });

    test('Dispatches getLogs action', () => {
        const getLogs = jest.fn();

        setTimeout( () => {
            expect(getLogs).toHaveBeenCalledTimes(1);
            expect(getLogs).toHaveBeenCalledWith({
                userId : testId,
                limit: 100
            });
            done();
        }, 0);
    })
});

describe('Stats with logs fetched', () => {
    const store = mockStore({
        user: {
            userData: {
                id: testId
            }
        },
        logs: {
            allLogs: {
                logs: testLogs,
                isFetching: false,
                error: null
            }
        }
    });

    const wrapper = mount(
        <Provider store={store}>
            <Stats/>
        </Provider>
    );

    test('Renders properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Renders two average boxes', () => {
        expect(wrapper.find('AverageBox').length).toBe(2);
    });

    test('Renders GraphCanvas', () => {
        expect(wrapper.find('GraphCanvas').length).toBe(1);
    });

    test('Renders Daytime graph', () => {
        expect(wrapper.find('DaytimeGraph').length).toBe(1);
    });
});

test('Renders error if there was error fetching logs for stats', () => {
    const testError = 'Test error';

    const store = mockStore({
        user: {
            userData: {
                id: testId
            }
        },
        logs: {
            allLogs: {
                logs: [],
                isFetching: false,
                error: testError
            }
        }
    });

    const wrapper = mount(
        <Provider store={store}>
            <Stats/>
        </Provider>
    );

    expect(wrapper.find('ErrorBox').length).toBe(1);
    expect(wrapper.find('ErrorBox').text()).toBe(testError);
})